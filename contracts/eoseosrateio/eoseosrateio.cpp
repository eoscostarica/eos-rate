#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>
#include "rapidjson/document.h"

using namespace std;
using namespace rapidjson;
using namespace eosio;

CONTRACT eoseosrateio : public contract {
  public:
    //"{\"costaricaeos\":{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10}
    
    using contract::contract;
    typedef struct bp_rate_t {
      float transparency;
      float testnets;
      float tooling;
      float infra;
      float community;
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
      eosio_assert(ratings_json[0] == '{', "payload must be ratings_json");
      eosio_assert(ratings_json[ratings_json.size()-1] == '}', "payload must be ratings_json");

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
         process_json_stats(ratings_json);

      } else {
         uniq_rating_index.modify(existing_rating, user, [&]( auto& row ) {
           row.user = user;
           row.bp = bp;
           row.updated_at = current_time();
           row.ratings_json = ratings_json;
         });
         //update the general data
         process_json_stats(ratings_json);

       }
    }

    void process_json_stats(string ratings_json){
      Document json;
      bp_rate_stats a_bp_stats;
      name bp_name = eosio::name("eoseosrateio");
      eosio_assert( json.Parse<0>(ratings_json.c_str() ).HasParseError() , "Error parsing" );
      for (Value::ConstMemberIterator itr = json.MemberBegin();itr != json.MemberEnd(); ++itr){
        //printf("Type of member %s is %s\n",
        //itr->name.GetString(), kTypeNames[itr->value.GetType()]);
        
        a_bp_stats.transparency = 3.333;
        a_bp_stats.testnets = 9.99;
        a_bp_stats.tooling = -9.9;
        a_bp_stats.infra = 7.5;
        a_bp_stats.community = 10;
        save_bp_stats(bp_name,&a_bp_stats);
      }
      

    }

    void save_bp_stats (name bp_name, bp_rate_stats * bp_rate ){
      //{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10}
      producers_stats_table bps_stats(_code, _code.value);
      auto itr = bps_stats.find(bp_name.value);
      if(itr == bps_stats.end()){
         bps_stats.emplace(_self, [&]( auto& row ) {
            row.bp = bp_name;
            //TODO: create func to write stats in json format
            //row.ratings_json = ratings_json;
            
            row.transparency = bp_rate->transparency;
            row.testnets = bp_rate->testnets;
            row.tooling = bp_rate->tooling;
            row.infra = bp_rate->infra;
            row.community = bp_rate->community;
            row.created_at = current_time();
            row.updated_at = current_time();
            row.proxy_voters_cntr = 1;
          });
        //new entry
       

      }else{
        //update the entry
        bps_stats.modify(itr,_self, [&]( auto& row ) {
          row.bp = bp_name;
          //TODO: create func to write stats in json format
          //row.ratings_json = ratings_json;
          
          row.transparency = bp_rate->transparency;
          row.testnets = bp_rate->testnets;
          row.tooling = bp_rate->tooling;
          row.infra = bp_rate->infra;
          row.community = bp_rate->community;
          row.updated_at = current_time();
          row.proxy_voters_cntr ++;
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
      string ratings_json;
      float proxy_voters_cntr;
      float transparency;
      float testnets;
      float tooling;
      float infra;
      float community;
      uint32_t created_at;
      uint32_t updated_at;
      uint64_t primary_key() const { return bp.value; }
      EOSLIB_SERIALIZE( block_producers_stats, (bp)(ratings_json)(transparency)(testnets)(tooling)(infra)(community)(created_at)(updated_at));
    };

    typedef eosio::multi_index<"bps.stats"_n, block_producers_stats > producers_stats_table;
    

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

EOSIO_DISPATCH(eoseosrateio, (rateproducer));


// NOTE:
// the table name ratings is damaged on the jungle testnet, changes in the struct without erasing the data on RAM seem have caused the problem.
// you need to be carefull when changing table structure, you cant do this if table is with data, you need to do new table with new structure and migrate data.
