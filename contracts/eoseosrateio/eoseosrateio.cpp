#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>
#include "rapidjson/document.h"

#define MINVAL 1
#define MAXVAL 10
#define MAXJSONSIZE 89

using namespace std;
using namespace rapidjson;
using namespace eosio;

CONTRACT eoseosrateio : public contract {
  public:
    using contract::contract;
    typedef struct bp_rate_t {
      float transparency;
      float infrastructure;
      float trustiness;
      float community;
      float development;
    } bp_rate_stats ;

    ACTION rateproducer(name user, name bp, string ratings_json) {
      require_auth(user);

      // user must be a proxy
      voters_table _voters(_self, "eosio"_n.value);
      auto pitr = _voters.find( user.value );
      if ( pitr != _voters.end() ) {
        eosio_assert( !pitr->is_proxy, "only proxy accounts are allowed to rate at the moment" );
      }

      //TODO: bp must be a registered block producer

      // the payload must be ratings_json.
      check(ratings_json[0] == '{', "payload must be ratings_json");
      check(ratings_json[ratings_json.size()-1] == '}', "payload must be ratings_json");

      // upsert bp rating
      producers_table bps(_self, _self.value);
      auto uniq_rating = (static_cast<uint128_t>(user.value) << 64) | bp.value;

      auto uniq_rating_index = bps.get_index<name("uniqrating")>();
      auto existing_rating = uniq_rating_index.find(uniq_rating);

      if( existing_rating == uniq_rating_index.end() ) {
          bps.emplace(user, [&]( auto& row ) {
            row.id = bps.available_primary_key();
            row.uniq_rating = uniq_rating;
            row.user = user;
            row.bp = bp;
            row.created_at = now();
            row.updated_at = now();
            row.ratings_json = ratings_json;
          });
          //update the general data
         process_json_stats(bp,ratings_json);

      } else {
         uniq_rating_index.modify(existing_rating, user, [&]( auto& row ) {
           row.user = user;
           row.bp = bp;
           row.updated_at = current_time();
           row.ratings_json = ratings_json;
         });
         //update the general data
         process_json_stats(bp,ratings_json);

       }
    }

    void process_json_stats(name bp_name,string ratings_json){
      Document json;
      bp_rate_stats a_bp_stats;
      
      check(!(MAXJSONSIZE<ratings_json.length()),"Error json rating data too big");
      check( !(json.Parse<0>(ratings_json.c_str() ).HasParseError()) , "Error parsing json_rating" );
      check( (json.HasMember("transparency")) , "Error json_rating doesn't provide transparency value" );
      check( (json["transparency"].IsInt()) , "Error json_rating doesn't provide valid transparency value" );
      check( (json.HasMember("infrastructure")) , "Error json_rating doesn't provide infrastructure value" );
      check( (json["infrastructure"].IsInt()) , "Error json_rating doesn't provide valid infrastructure value" );
      check( (json.HasMember("trustiness")) , "Error json_rating doesn't provide trustiness value" );
      check( (json["trustiness"].IsInt()) , "Error json_rating doesn't provide valid trustiness value" );
      check( (json.HasMember("development")) , "Error json_rating doesn't provide development value" );
      check( (json["development"].IsInt()) , "Error json_rating doesn't provide valid development value" );
      check( (json.HasMember("community")) , "Error json_rating doesn't provide community value" );
      check( (json["community"].IsInt()) , "Error json_rating doesn't provide valid community value" );
      a_bp_stats.transparency = json["transparency"].GetInt();
      check( (MINVAL<=a_bp_stats.transparency && a_bp_stats.transparency<=MAXVAL ), "Error transparency value out of range" );
      a_bp_stats.infrastructure = json["infrastructure"].GetInt();
      check( (MINVAL<=a_bp_stats.infrastructure && a_bp_stats.infrastructure<=MAXVAL ), "Error infrastructure value out of range" );
      a_bp_stats.trustiness = json["trustiness"].GetInt();
      check( (MINVAL<=a_bp_stats.trustiness && a_bp_stats.trustiness<=MAXVAL ), "Error trustiness value out of range" );
      a_bp_stats.development = json["development"].GetInt();
      check( (MINVAL<=a_bp_stats.development && a_bp_stats.development <=MAXVAL ), "Error development value out of range" );
      a_bp_stats.community = json["community"].GetInt();
      check( (MINVAL<=a_bp_stats.community && a_bp_stats.community<=MAXVAL ), "Error community value out of range" );
      save_bp_stats(bp_name,&a_bp_stats);
      
    }
    
    void save_bp_stats (name bp_name, bp_rate_stats * bp_rate ){
      producers_stats_table bps_stats(_code, _code.value);
      auto itr = bps_stats.find(bp_name.value);
      if(itr == bps_stats.end()){
        //new entry
         bps_stats.emplace(_self, [&]( auto& row ) {
            row.bp = bp_name;
            row.proxy_voters_cntr = 1;
            row.transparency = bp_rate->transparency;
            row.infrastructure = bp_rate->infrastructure;
            row.trustiness = bp_rate->trustiness;
            row.development = bp_rate->development;
            row.community = bp_rate->community;
            row.created_at = current_time();
            row.updated_at = current_time();
          });
      }else{
        //update the entry
        bps_stats.modify(itr,_self, [&]( auto& row ) {
          row.bp = bp_name;
          row.proxy_voters_cntr = row.proxy_voters_cntr + 1;
          bp_rate->transparency = (bp_rate->transparency + row.transparency)/2;
          bp_rate->infrastructure = (bp_rate->infrastructure + row.infrastructure)/2;
          bp_rate->trustiness = (bp_rate->trustiness + row.trustiness)/2;
          bp_rate->development  = (bp_rate->development + row.development)/2;
          bp_rate->community = (bp_rate->community + row.community)/2;
          row.transparency = bp_rate->transparency;
          row.infrastructure = bp_rate->infrastructure;
          row.trustiness = bp_rate->trustiness;
          row.development = bp_rate->development;
          row.community = bp_rate->community;
          row.updated_at = current_time();
         });
      }
    }

    // for dev only
    ACTION erase() {
      //only contract owner can erase table
      require_auth(_self);

      producers_table bps(_code, _code.value);
      auto itr = bps.begin();
      while ( itr != bps.end()) {
          itr = bps.erase(itr);
      }

      producers_stats_table bps_stats(_code, _code.value);
      auto itr_stats = bps_stats.begin();
      while ( itr_stats != bps_stats.end()) {
          itr_stats = bps_stats.erase(itr_stats);
      }
    }

  private:
    TABLE block_producers_stats {
      name bp;
      uint32_t proxy_voters_cntr;
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
      string ratings_json;
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

    TABLE voter_info {
      name                owner;     /// the voter
      name                proxy;     /// the proxy set by the voter, if any
      std::vector<name>   producers; /// the producers approved by this voter if no proxy set
      int64_t             staked = 0;
      double              last_vote_weight = 0; /// the vote weight cast the last time the vote was updated
      double              proxied_vote_weight= 0; /// the total vote weight delegated to this voter as a proxy
      bool                is_proxy = 0; /// whether the voter is a proxy for others
      uint32_t            reserved1 = 0;
      uint32_t            reserved2 = 0;
      eosio::asset        reserved3;

      uint64_t primary_key()const { return owner.value; }

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( voter_info, (owner)(proxy)(producers)(staked)(last_vote_weight)(proxied_vote_weight)(is_proxy)(reserved1)(reserved2)(reserved3) )
    };

    typedef eosio::multi_index<"voters"_n, eoseosrateio::voter_info > voters_table;
};

EOSIO_DISPATCH(eoseosrateio, (rateproducer)(erase));


// NOTE:
// the table name ratings is damaged on the jungle testnet, changes in the struct without erasing the data on RAM seem have caused the problem.
// you need to be carefull when changing table structure, you cant do this if table is with data, you need to do new table with new structure and migrate data.
