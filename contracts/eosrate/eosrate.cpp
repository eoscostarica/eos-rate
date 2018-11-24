#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using std::string;

CONTRACT eosrate : public contract {
public:
    using contract::contract;

    eosrate(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

    ACTION upsert(name rater_account, const string json) {
        require_auth(rater_account);
        // Quick check to remind the user the payload must be json.
        eosio_assert(json[0] == '{',             "payload must be json");
        eosio_assert(json[json.size()-1] == '}', "payload must be json");
        rate_index rates(_code, _code.value);

        auto iterator = rates.find(rater_account.value);
        if( iterator == rates.end() )
        {
            rates.emplace(rater_account, [&]( auto& row ) {
                row.key = rater_account;
                row.json = json;
            });
        }
        else {
            rates.modify(iterator, rater_account, [&]( auto& row ) {
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
    typedef eosio::multi_index<"rates"_n, rate> rate_index;
};

EOSIO_DISPATCH(eosrate, (upsert));
