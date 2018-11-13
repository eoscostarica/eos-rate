#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

CONTRACT eosrate : public contract {
  public:
      using contract::contract;

      ACTION rate( name user ) {
         require_auth( user );
         print( "Thanks for rating my friend, ", name{user});
      }
};
EOSIO_DISPATCH( eosrate, (rate))
