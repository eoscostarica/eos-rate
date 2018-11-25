cmake_minimum_required(VERSION 3.5)
project(eosrate_example VERSION 1.0.0)

find_package(eosio.cdt)

### Only generate the wasm
#add_executable( eosrate.wasm eosrate.cpp )

### Generate the wasm and abi
add_contract( eosrate eosrate eosrate.cpp)
