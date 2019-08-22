#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

CONTRACT eoseosrateio : public contract {
  public:
    using contract::contract;

    // ratings a are being stored on an external db thru demux
    ACTION rateproducer(name user, name bp, string ratings_json) {
      require_auth(user);
      check(ratings_json[0] == '{', "payload must be a valid json");
      check(ratings_json[ratings_json.size()-1] == '}', "payload must be a valid json");
    }
};

EOSIO_DISPATCH(eoseosrateio, (rateproducer));
