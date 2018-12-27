#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using std::string;

CONTRACT eoseosrateio : public contract {
public:
    using contract::contract;

    eoseosrateio(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

    ACTION upsert(name rater_account, const string json) {
        require_auth(rater_account);
        // Quick check to remind the user the payload must be json.
        eosio_assert(json[0] == '{',             "payload must be json");
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
};

EOSIO_DISPATCH(eoseosrateio, (upsert));
