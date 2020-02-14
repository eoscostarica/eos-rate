#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <eosio/asset.hpp>
#include <eosio/multi_index.hpp>
#include <eosio/system.hpp>
#include <eosio/time.hpp>
#include <eosio/permission.hpp> 
#include <algorithm>

#define MINVAL 0
#define MAXVAL 10
#define MIN_VOTERS 21 

using namespace std;
using namespace eosio;
using eosio::public_key; 

namespace eosio {
    

   constexpr name system_account{"eosio"_n};
   
    struct producer_info {
      name                  owner;
      double                total_votes = 0;
      eosio::public_key     producer_key; /// a packed public key object
      bool                  is_active = true;
      std::string           url;
      uint32_t              unpaid_blocks = 0;
      time_point            last_claim_time;
      uint16_t              location = 0;

      uint64_t primary_key()const { return owner.value;                             }
      double   by_votes()const    { return is_active ? -total_votes : total_votes;  }
      bool     active()const      { return is_active;                               }
      void     deactivate()       { producer_key = public_key(); is_active = false; }

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( producer_info, (owner)(total_votes)(producer_key)(is_active)(url)
                        (unpaid_blocks)(last_claim_time)(location) )
    };
    
     typedef eosio::multi_index< "producers"_n, producer_info,
                               indexed_by<"prototalvote"_n, const_mem_fun<producer_info, double, &producer_info::by_votes>  >
                             > producers_table;
    
    bool is_blockproducer(name bp_name){
        producers_table bp(system_account, system_account.value);
        auto it = bp.find(bp_name.value);
        if(it==bp.end()){
            return false;
        }
        return true;
    }


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
      
      ACTION rate(name user, 
                  name bp, 
                  int8_t transparency,
                  int8_t infrastructure,
                  int8_t trustiness,
                  int8_t community,
                  int8_t development) {
        check( (transparency+infrastructure+trustiness+community+development), "Error vote must have value for at least one category");  
        check( (MINVAL<= transparency &&  transparency<=MAXVAL ), "Error transparency value out of range");
        check( (MINVAL<= infrastructure &&  infrastructure<=MAXVAL ), "Error infrastructure value out of range" );
        check( (MINVAL<= trustiness &&  trustiness<=MAXVAL ), "Error trustiness value out of range" );
        check( (MINVAL<= development &&  development <=MAXVAL ), "Error development value out of range" );
        check( (MINVAL<= community &&  community<=MAXVAL ), "Error community value out of range" );
      
         //checks if the bp is active 
        check(is_blockproducer(bp),"votes are allowed only for registered block producers");
        
        eosio::name proxy_name = get_proxy(user);
        if(proxy_name.length()){
          //account votes through a proxy
          check(!(MIN_VOTERS > get_voters(proxy_name)), "delegated proxy does not have enough voters" );
        }else{
          // acount must vote for at least 21 bp
          check(!(MIN_VOTERS > get_voters(user)), "account does not have enough voters" );
        }
          
        // upsert bp rating
        _ratings bps(_self, _self.value);
        auto uniq_rating = (static_cast<uint128_t>(user.value) << 64) | bp.value;

        auto uniq_rating_index = bps.get_index<name("uniqrating")>();
        auto existing_rating = uniq_rating_index.find(uniq_rating);

        if( existing_rating == uniq_rating_index.end() ) {
          bps.emplace(_self, [&]( auto& row ) {
            row.id = bps.available_primary_key();
            row.uniq_rating = uniq_rating;
            row.user = user;
            row.bp = bp;
            row.transparency = transparency;
            row.infrastructure = infrastructure;
            row.trustiness = trustiness;
            row.community = community;
            row.development = development ;   
          });
          //save stats
          save_bp_stats(bp,
                        transparency,
                        infrastructure,
                        trustiness,
                        community,
                        development);
        

        } else {
           //the voter update its vote
          uniq_rating_index.modify(existing_rating, _self, [&]( auto& row ) {
            row.user = user;
            row.bp = bp;
            row.transparency = transparency;
            row.infrastructure = infrastructure;
            row.trustiness = trustiness;
            row.community = community;
            row.development = development ;  
          });
          //update bp stats
           float bp_transparency = 0;
           float bp_infrastructure = 0;
           float bp_trustiness = 0;
           float bp_community = 0;
           float bp_development = 0;
           uint32_t  bp_ratings_cntr = 0;
           float  bp_average = 0;
           calculate_bp_stats (bp,
                               &bp_transparency,
                               &bp_infrastructure,
                               &bp_trustiness,
                               &bp_community,
                               &bp_development,
                               &bp_ratings_cntr,
                               &bp_average);
           update_bp_stats (&user,
                            &bp,
                            &bp_transparency,
                            &bp_infrastructure,
                            &bp_trustiness,
                            &bp_community,
                            &bp_development,
                            &bp_ratings_cntr,
                            &bp_average);


        }
        
    }

    
    void save_bp_stats (name bp_name,
                       float transparency,
                       float infrastructure,
                       float trustiness,
                       float community,
                       float development
                       ){
      _stats bps_stats(_self, _self.value);
      auto itr = bps_stats.find(bp_name.value);
      float counter =0;
      float sum = 0;
      if(itr == bps_stats.end()){
        //new entry
         bps_stats.emplace(_self, [&]( auto& row ) {
            
            if (transparency){
                row.transparency = transparency;
                counter++;
                sum += transparency;
            }

            if (infrastructure){
                row.infrastructure = infrastructure;
                counter++;
                sum += infrastructure;
            }

            if (trustiness){
                row.trustiness = trustiness;
                counter++;
                sum += trustiness;
            }

            if (development){
                row.development = development;
                counter++;
                sum += development;
            }

            if (community){
                row.community = community;
                counter++;
                sum += community;
            }

            if(counter){
                row.bp = bp_name;
                row.ratings_cntr = 1;
                row.average =sum/counter;
                print("sum/counter",sum ,counter);
            }
          });
      }else{
        //update the entry
        bps_stats.modify(itr,_self, [&]( auto& row ) {
          if (transparency){
                sum += transparency;
                if(row.transparency){
                    transparency = (transparency + row.transparency)/2;
                }
                row.transparency = transparency;
                counter++;
            }

            if (infrastructure){
                sum += infrastructure;
                if(row.infrastructure){
                    infrastructure = (infrastructure + row.infrastructure)/2;
                }
                row.infrastructure = infrastructure;
                counter++;
            }

            if (trustiness){
                sum += trustiness;
                if(row.trustiness){
                    trustiness = (trustiness + row.trustiness)/2;
                }
                row.trustiness = trustiness;
                counter++;
            }

            if (development){
                sum += development;
                if(row.development){
                    development  = (development + row.development)/2;
                }
                row.development = development;
                counter++;
            }

            if (community){
                sum += community;
                if(row.community){
                    community = (community + row.community)/2;
                }
                row.community = community;
                counter++;
            }

            if(counter){
                row.ratings_cntr++;
                row.average =( (sum/counter) + row.average ) /2;
            }
         });
      }
    }
    
    
     void calculate_bp_stats ( name bp_name,
                       float * transparency,
                       float * infrastructure,
                       float * trustiness,
                       float * community,
                       float * development,
                       uint32_t * ratings_cntr,
                       float  * average
                       ){
       
        float category_counter = 0;
        
        float transparency_total  = 0;
        float infrastructure_total = 0;
        float trustiness_total = 0;
        float community_total = 0;
        float development_total = 0;
        
        float transparency_cntr = 0;
        float infrastructure_cntr = 0;
        float trustiness_cntr = 0;
        float community_cntr = 0;
        float development_cntr = 0;
        uint32_t voters_cntr = 0;

        _ratings bps(_self, _self.value);
        auto bps_index = bps.get_index<name("bp")>();
        auto bps_it = bps_index.find(bp_name.value); 
        
        while(bps_it != bps_index.end()){
           if(bp_name == bps_it->bp){
               if(bps_it->transparency){
                   transparency_total+=bps_it->transparency;
                   transparency_cntr++;
               }

               if(bps_it->infrastructure){
                   infrastructure_total+=bps_it->infrastructure;
                   infrastructure_cntr++;
               }

               if(bps_it->trustiness){
                   trustiness_total+=bps_it->trustiness;
                   trustiness_cntr++;
               }

               if(bps_it->community){
                   community_total+=bps_it->community;
                   community_cntr++;
               }

               if(bps_it->development){
                   development_total+=bps_it->development;
                   development_cntr++;
               }
               voters_cntr++;
            }
            bps_it ++;
        }
        
        if(transparency_cntr){
            *transparency = transparency_total/transparency_cntr;
            category_counter++;
        }
        
        if(infrastructure_cntr){
            *infrastructure =infrastructure_total/infrastructure_cntr;
            category_counter++;
        }
           
        if(trustiness_cntr){
            *trustiness = trustiness_total/trustiness_cntr;
            category_counter++;
        }
           
        if(community_cntr){
            *community = community_total/community_cntr;
            category_counter++;
        }
           
        if(development_cntr){
            *development = development_total/development_cntr;
            category_counter++;
        } 
        *average = (*transparency + *infrastructure + *trustiness + *community +*development)/category_counter;
        *ratings_cntr = voters_cntr;
    }
    
    void update_bp_stats (name * user,
                       name * bp_name,
                       float * transparency,
                       float * infrastructure,
                       float * trustiness,
                       float * community,
                       float * development,
                       uint32_t * ratings_cntr,
                       float * average
                       ){
     
      _stats bps_stats(_self, _self.value);
      auto itr = bps_stats.find(bp_name->value);
      if(itr != bps_stats.end()){
        bps_stats.modify(itr,_self, [&]( auto& row ) {
            row.transparency = *transparency;
            row.infrastructure = *infrastructure;
            row.trustiness = *trustiness;
            row.development = *development;
            row.community = *community;      
            row.ratings_cntr= *ratings_cntr;
            row.average = *average;
         });
          
      }
    }
    

    
    ACTION erase(name bp_name) {
        
        require_auth(_self);

        _ratings bps(_self, _self.value);
        auto itr = bps.begin();
        while ( itr != bps.end()) {
            if(itr->bp == bp_name){
                itr = bps.erase(itr);
            }else{
                itr++;
            }
        }

        _stats bps_stats(_self, _self.value);
        auto itr_stats = bps_stats.begin();
        while ( itr_stats != bps_stats.end()) {
            if(itr_stats->bp == bp_name){
                itr_stats = bps_stats.erase(itr_stats);
            }else{
                itr_stats++;
            }
        }
    }
    
    ACTION wipe() {
        
        require_auth(_self);
        _ratings bps(_self, _self.value);
        auto itr = bps.begin();
        while ( itr != bps.end()) {
            itr = bps.erase(itr);
        }

        _stats bps_stats(_self, _self.value);
        auto itr_stats = bps_stats.begin();
        while ( itr_stats != bps_stats.end()) {
            itr_stats = bps_stats.erase(itr_stats);
        }
    }


  private:
    TABLE stats {
      name bp;
      uint32_t ratings_cntr;
      float average;
      float transparency;
      float infrastructure;
      float trustiness;
      float development;  
      float community;
      uint64_t primary_key() const { return bp.value; }
    };

    typedef eosio::multi_index<"stats"_n, stats > _stats;


    TABLE ratings {
      uint64_t id;
      uint128_t uniq_rating;
      name user;
      name bp;
      float transparency;
      float infrastructure;
      float trustiness;
      float development;  
      float community;
      uint64_t primary_key() const { return id; }
      uint128_t by_uniq_rating() const { return uniq_rating; }
      uint64_t by_user() const { return user.value; }
      uint64_t by_bp() const { return bp.value; }
    };

    typedef eosio::multi_index<"ratings"_n, ratings,
        indexed_by<"uniqrating"_n, const_mem_fun<ratings, uint128_t, &ratings::by_uniq_rating>>,
        indexed_by<"user"_n, const_mem_fun<ratings, uint64_t, &ratings::by_user>>,
        indexed_by<"bp"_n, const_mem_fun<ratings, uint64_t, &ratings::by_bp>>
      > _ratings;

};

EOSIO_DISPATCH(rateproducer,(rate)(erase)(wipe));
