#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/multi_index.hpp>

using namespace eosio;
using namespace std;

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

} /// namespace eosio

CONTRACT eoseosrateio : public contract {
  public:
    using contract::contract;

    ACTION rateproducer(name user, name bp, string ratings_json) {
      require_auth(_self);

      // user must be a proxy
      check( is_proxy(user), "only proxy accounts are allowed to rate at the moment" );
      
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
          bps.emplace(_self, [&]( auto& row ) {
            row.id = bps.available_primary_key();
            row.uniq_rating = uniq_rating;
            row.user = user;
            row.bp = bp;
            row.created_at = now();
            row.updated_at = now();
            row.ratings_json = ratings_json;
          });

      } else {
         uniq_rating_index.modify(existing_rating, _self, [&]( auto& row ) {
           row.user = user;
           row.bp = bp;
           row.created_at = current_time();
           row.ratings_json = ratings_json;
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
    }

  private:
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

EOSIO_DISPATCH(eoseosrateio, (rateproducer));