#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <eosio/asset.hpp>
#include <eosio/multi_index.hpp>
#include <eosio/system.hpp>
#include <eosio/time.hpp>

#include "rapidjson/document.h"

#define MINVAL 0
#define MAXVAL 10
#define MAXJSONSIZE 200
#define MIN_VOTERS 21 

using namespace std;
using namespace rapidjson;
using namespace eosio;

namespace eosio {

   constexpr name system_account{"eosio"_n};

   struct voter_info {
      name                owner;
      name                proxy;
      std::vector<name>   producers;
      int64_t             staked = 0;
      double              last_vote_weight = 0;
      double              proxied_vote_weight= 0;
      bool                is_proxy = 0;
      uint32_t            flags1 = 0;
      uint32_t            reserved2 = 0;
      eosio::asset        reserved3;

      uint64_t primary_key()const { return owner.value; }

      EOSLIB_SERIALIZE( voter_info, (owner)(proxy)(producers)(staked)(last_vote_weight)(proxied_vote_weight)(is_proxy)(flags1)(reserved2)(reserved3) )
   };

   typedef eosio::multi_index< "voters"_n, voter_info >  voters_table;

   bool is_proxy(name name) {
      voters_table _voters(system_account, system_account.value);
      auto it = _voters.find(name.value);
      return it != _voters.end() && it->is_proxy;
   }

   int get_voters (name name) {
      voters_table _voters(system_account, system_account.value);
      auto it = _voters.find(name.value);
      if(it==_voters.end()){
          return 0;
      }
      return it->producers.size();
   }

     eosio::name get_proxy ( eosio::name name) {

      voters_table _voters(system_account, system_account.value);
      auto it = _voters.find(name.value);
      if(it==_voters.end()){
          eosio::name result("");
          return result;
      }
      return it->proxy;
   }

} /// namespace eosio

CONTRACT rateproducer : public contract {
  public:
    using contract::contract;
      typedef struct bp_rate_t {
        float transparency;
        float infrastructure;
        float trustiness;
        float community;
        float development;
      } bp_rate_stats ;

      ACTION rate(name user, name bp, string ratings_json) {
      
      eosio::name proxy_name = get_proxy(user);
      print("voters: ", get_voters(proxy_name)," MIN_VOTERS: ",MIN_VOTERS);
      if(proxy_name.length()){
          //account votes through a proxy
          check(!(MIN_VOTERS > get_voters(proxy_name)), "delegated proxy does not have enough voters" );
      }else{
          // acount must vote for at least 21 bp
          check(!(MIN_VOTERS > get_voters(user)), "account does not have enough voters" );
      }

     
      // the payload must be ratings_json.
      check(ratings_json[0] == '{', "payload must be ratings_json");
      check(ratings_json[ratings_json.size()-1] == '}', "payload must be ratings_json");
      
      bp_rate_stats bp_stats = {0,0,0,0,0};
      bool flag =  process_json_stats( ratings_json,&bp_stats);
      if(flag){
        // upsert bp rating
        producers_table bps(_self, _self.value);
        auto uniq_rating = (static_cast<uint128_t>(user.value) << 64) | bp.value;

        auto uniq_rating_index = bps.get_index<name("uniqrating")>();
        auto existing_rating = uniq_rating_index.find(uniq_rating);

        uint64_t now = eosio::current_time_point().time_since_epoch().count();

        if( existing_rating == uniq_rating_index.end() ) {
          bps.emplace(_self, [&]( auto& row ) {
            row.id = bps.available_primary_key();
            row.uniq_rating = uniq_rating;
            row.user = user;
            row.bp = bp;
            row.created_at = now;
            row.updated_at = now;
            row.transparency = bp_stats.transparency;
            row.infrastructure = bp_stats.infrastructure;
            row.trustiness = bp_stats.trustiness;
            row.community = bp_stats.community;
            row.development = bp_stats.development ;   
          });
          
        } else {
          uniq_rating_index.modify(existing_rating, _self, [&]( auto& row ) {
            row.user = user;
            row.bp = bp;
            row.updated_at = now;
            row.transparency = bp_stats.transparency;
            row.infrastructure = bp_stats.infrastructure;
            row.trustiness = bp_stats.trustiness;
            row.community = bp_stats.community;
            row.development = bp_stats.development ;  
          });
          
        }
        //update stats
        save_bp_stats(bp,&bp_stats);
      }
      
    }

    bool process_json_stats(string ratings_json,bp_rate_stats * a_bp_stats){
      Document json;
      bool flag = false;

      check(!(MAXJSONSIZE<ratings_json.length()),"Error json rating data too big");
      check( !(json.Parse<0>(ratings_json.c_str() ).HasParseError()) , "Error parsing json_rating" );

      if(json.HasMember("transparency") && json["transparency"].IsInt()){
          a_bp_stats->transparency = json["transparency"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats->transparency && a_bp_stats->transparency<=MAXVAL ), "Error transparency value out of range" );

      if(json.HasMember("infrastructure") && json["infrastructure"].IsInt()){
          a_bp_stats->infrastructure = json["infrastructure"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats->infrastructure && a_bp_stats->infrastructure<=MAXVAL ), "Error infrastructure value out of range" );

      if ( json.HasMember("trustiness") && json["trustiness"].IsInt() ){
          a_bp_stats->trustiness = json["trustiness"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats->trustiness && a_bp_stats->trustiness<=MAXVAL ), "Error trustiness value out of range" );

      if ( json.HasMember("development") && json["development"].IsInt() ){
          a_bp_stats->development = json["development"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats->development && a_bp_stats->development <=MAXVAL ), "Error development value out of range" );


      if ( json.HasMember("community") && json["community"].IsInt() ){
          a_bp_stats->community = json["community"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats->community && a_bp_stats->community<=MAXVAL ), "Error community value out of range" );


      return flag;

    }

    void save_bp_stats (name bp_name, bp_rate_stats * bp_rate ){
      producers_stats_table bps_stats(_self, _self.value);
      auto itr = bps_stats.find(bp_name.value);
      int counter =0;
      int sum = 0;
      uint64_t now = eosio::current_time_point().time_since_epoch().count();
      if(itr == bps_stats.end()){
        //new entry
         bps_stats.emplace(_self, [&]( auto& row ) {

            if (bp_rate->transparency){
                row.transparency = bp_rate->transparency;
                counter++;
                sum += bp_rate->transparency;
            }

            if (bp_rate->infrastructure){
                row.infrastructure = bp_rate->infrastructure;
                counter++;
                sum += bp_rate->infrastructure;
            }

            if (bp_rate->trustiness){
                row.trustiness = bp_rate->trustiness;
                counter++;
                sum += bp_rate->trustiness;
            }

            if (bp_rate->development){
                row.development = bp_rate->development;
                counter++;
                sum += bp_rate->development;
            }

            if (bp_rate->community){
                row.community = bp_rate->community;
                counter++;
                sum += bp_rate->community;
            }

            if(counter){
                row.bp = bp_name;
                row.ratings_cntr = 1;
                row.average =sum/counter;
                row.created_at = now;
                row.updated_at = now;
            }
          });
      }else{
        //update the entry
        bps_stats.modify(itr,_self, [&]( auto& row ) {
          if (bp_rate->transparency){
                sum += bp_rate->transparency;
                if(row.transparency){
                    bp_rate->transparency = (bp_rate->transparency + row.transparency)/2;
                }
                row.transparency = bp_rate->transparency;
                counter++;
            }

            if (bp_rate->infrastructure){
                sum += bp_rate->infrastructure;
                if(row.infrastructure){
                    bp_rate->infrastructure = (bp_rate->infrastructure + row.infrastructure)/2;
                }
                row.infrastructure = bp_rate->infrastructure;
                counter++;
            }

            if (bp_rate->trustiness){
                sum += bp_rate->trustiness;
                if(row.trustiness){
                    bp_rate->trustiness = (bp_rate->trustiness + row.trustiness)/2;
                }
                row.trustiness = bp_rate->trustiness;
                counter++;
            }

            if (bp_rate->development){
                sum += bp_rate->development;
                if(row.development){
                    bp_rate->development  = (bp_rate->development + row.development)/2;
                }
                row.development = bp_rate->development;
                counter++;
            }

            if (bp_rate->community){
                sum += bp_rate->community;
                if(row.community){
                    bp_rate->community = (bp_rate->community + row.community)/2;
                }
                row.community = bp_rate->community;
                counter++;
            }

            if(counter){
                row.ratings_cntr++;
                row.average =( (sum/counter) + row.average ) /2;
                row.updated_at = now;
            }
         });
      }
    }

    // for dev only
    ACTION erase(string table) {
      // table = bps or stats
      //only contract owner can erase table
      require_auth(_self);

      if(!table.compare("bps")){
      	producers_table bps(_self, _self.value);
      	auto itr = bps.begin();
      	while ( itr != bps.end()) {
      	    itr = bps.erase(itr);
      	}
      }

      if(!table.compare("stats")){
      	producers_stats_table bps_stats(_self, _self.value);
      	auto itr_stats = bps_stats.begin();
      	while ( itr_stats != bps_stats.end()) {
            itr_stats = bps_stats.erase(itr_stats);
      	}
      }
    }

  private:
    TABLE block_producers_stats {
      name bp;
      uint32_t ratings_cntr;
      float average;
      float transparency;
      float infrastructure;
      float trustiness;
      float community;
      float development;
      uint32_t created_at;
      uint32_t updated_at;
      uint64_t primary_key() const { return bp.value; }
    };

    typedef eosio::multi_index<"stats"_n, block_producers_stats > producers_stats_table;


    TABLE block_producer {
      uint64_t id;
      uint128_t uniq_rating;
      name user;
      name bp;
      float transparency;
      float infrastructure;
      float trustiness;
      float community;
      float development;
      uint32_t created_at;
      uint32_t updated_at;

      uint64_t primary_key() const { return id; }
      uint128_t by_uniq_rating() const { return uniq_rating; }
      uint64_t by_user() const { return user.value; }
      uint64_t by_bp() const { return bp.value; }
    };

    typedef eosio::multi_index<"bps"_n, block_producer,
        indexed_by<"uniqrating"_n, const_mem_fun<block_producer, uint128_t, &block_producer::by_uniq_rating>>,
        indexed_by<"user"_n, const_mem_fun<block_producer, uint64_t, &block_producer::by_user>>,
        indexed_by<"bp"_n, const_mem_fun<block_producer, uint64_t, &block_producer::by_bp>>
      > producers_table;

};

EOSIO_DISPATCH(rateproducer, (rate)(erase));
