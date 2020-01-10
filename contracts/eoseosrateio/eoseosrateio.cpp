#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>
#include "rapidjson/document.h"

#define MINVAL 0
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
      bp_rate_stats a_bp_stats = {0,0,0,0,0};
      bool flag = false;
      
      check(!(MAXJSONSIZE<ratings_json.length()),"Error json rating data too big");
      check( !(json.Parse<0>(ratings_json.c_str() ).HasParseError()) , "Error parsing json_rating" );

      if(json.HasMember("transparency") && json["transparency"].IsInt()){
          a_bp_stats.transparency = json["transparency"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats.transparency && a_bp_stats.transparency<=MAXVAL ), "Error transparency value out of range" );

      if(json.HasMember("infrastructure") && json["infrastructure"].IsInt()){
          a_bp_stats.infrastructure = json["infrastructure"].GetInt();
          flag=true; 
      }
      check( (MINVAL<=a_bp_stats.infrastructure && a_bp_stats.infrastructure<=MAXVAL ), "Error infrastructure value out of range" );

      if ( json.HasMember("trustiness") && json["trustiness"].IsInt() ){
          a_bp_stats.trustiness = json["trustiness"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats.trustiness && a_bp_stats.trustiness<=MAXVAL ), "Error trustiness value out of range" );

      if ( json.HasMember("development") && json["development"].IsInt() ){
          a_bp_stats.development = json["development"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats.development && a_bp_stats.development <=MAXVAL ), "Error development value out of range" );


      if ( json.HasMember("community") && json["community"].IsInt() ){
          a_bp_stats.community = json["community"].GetInt();
          flag=true;
      }
      check( (MINVAL<=a_bp_stats.community && a_bp_stats.community<=MAXVAL ), "Error community value out of range" );

      if(flag){
      	save_bp_stats(bp_name,&a_bp_stats);
      }
      
    }
    
    void save_bp_stats (name bp_name, bp_rate_stats * bp_rate ){
      producers_stats_table bps_stats(_code, _code.value);
      auto itr = bps_stats.find(bp_name.value);
      int counter =0;
      int sum = 0;
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
                row.proxy_voters_cntr = 1;
                row.average =sum/counter;  
                row.created_at = current_time();
                row.updated_at = current_time();
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
                row.proxy_voters_cntr++;
                row.average =( (sum/counter) + row.average ) /2; 
                row.updated_at = current_time();
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
      	producers_table bps(_code, _code.value);
      	auto itr = bps.begin();
      	while ( itr != bps.end()) {
      	    itr = bps.erase(itr);
      	}
      }

      if(!table.compare("stats")){
      	producers_stats_table bps_stats(_code, _code.value);
      	auto itr_stats = bps_stats.begin();
      	while ( itr_stats != bps_stats.end()) {
            itr_stats = bps_stats.erase(itr_stats);
      	}
      }
    }

  private:
    TABLE block_producers_stats {
      name bp;
      uint32_t proxy_voters_cntr;
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

};

EOSIO_DISPATCH(eoseosrateio, (rateproducer)(erase));

