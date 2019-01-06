#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using std::string;

CONTRACT eoseosrateio : public contract {
public:
  using contract::contract;

  eoseosrateio(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  ACTION rateproducer(name rater_account, const string json) {
    require_auth(rater_account);

    // rater_account must be a proxy
    auto pitr = _voters.find( rater_account.value );
    if ( pitr != _voters.end() ) {
      eosio_assert( !pitr->is_proxy, "only proxy accounts are allowed to rate at the moment" );
    }

    // the payload must be json.
    eosio_assert(json[0] == '{', "payload must be json");
    eosio_assert(json[json.size()-1] == '}', "payload must be json");
    rate_index ratings(_code, _code.value);

    auto iterator = ratings.find(rater_account.value);
    if( iterator == ratings.end() )
    {
      ratings.emplace(rater_account, [&]( auto& row ) {
          row.key = rater_account;
          row.json = json;
      });
    }
    else {
      ratings.modify(iterator, rater_account, [&]( auto& row ) {
        row.json = json;
      });
    }
  }

private:
  TABLE rate {
      name key;
      string json;
      uint64_t primary_key() const { return key.value; }
  };

  typedef eosio::multi_index<"ratings"_n, rate> rate_index;

  TABLE voter_info {
      name                owner;     /// the voter
      name                proxy;     /// the proxy set by the voter, if any
      std::vector<name>   producers; /// the producers approved by this voter if no proxy set
      int64_t             staked = 0;

      /**
       *  Every time a vote is cast we must first "undo" the last vote weight, before casting the
       *  new vote weight.  Vote weight is calculated as:
       *
       *  stated.amount * 2 ^ ( weeks_since_launch/weeks_per_year)
       */
      double              last_vote_weight = 0; /// the vote weight cast the last time the vote was updated

      /**
       * Total vote weight delegated to this voter.
       */
      double              proxied_vote_weight= 0; /// the total vote weight delegated to this voter as a proxy
      bool                is_proxy = 0; /// whether the voter is a proxy for others


      uint32_t            reserved1 = 0;
      uint32_t            reserved2 = 0;
      eosio::asset        reserved3;

      uint64_t primary_key()const { return owner.value; }

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( voter_info, (owner)(proxy)(producers)(staked)(last_vote_weight)(proxied_vote_weight)(is_proxy)(reserved1)(reserved2)(reserved3) )
   };

   typedef eosio::multi_index<N(eosio), voter_info > voters_table;
};

EOSIO_DISPATCH(eoseosrateio, (rateproducer));
