#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <eosio/asset.hpp>
#include <eosio/system.hpp>
#include <eosio/multi_index.hpp>

using namespace eosio;
using namespace std;

CONTRACT eoseosrateio : public contract {
  public:
    using contract::contract;

    ACTION rateproducer(name user, name bp, string ratings_json) {
      require_auth(user);

      check(ratings_json[0] == '{', "payload must be json");
      check(ratings_json[ratings_json.size()-1] == '}', "payload must be json");

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
            row.updated_at = now();
            row.ratings_json = ratings_json;
          });

      } else {
         uniq_rating_index.modify(existing_rating, user, [&]( auto& row ) {
           row.user = user;
           row.bp = bp;
           row.updated_at = now();
           row.ratings_json = ratings_json;
         });
       }

      action(
        permission_level{get_self(),"active"_n},
        "eosratetoken"_n,
        "transfer"_n,
        std::make_tuple(get_self(), user, asset(10000, symbol("RATE", 4)), string("eosrate.io"))
      ).send();
    }


    ACTION reset() {
      //only contract owner can erase table
      require_auth(_self);

      producers_table bps(get_self(), get_self().value);
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

    uint32_t now() {
      return current_time_point().sec_since_epoch();
    }
};

EOSIO_DISPATCH(eoseosrateio, (rateproducer)(reset));


// NOTE:
// the table name ratings is damaged on the jungle testnet, changes in the struct without erasing the data on RAM seem have caused the problem.
// you need to be carefull when changing table structure, you cant do this if table is with data, you need to do new table with new structure and migrate data.
