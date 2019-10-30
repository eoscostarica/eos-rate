cmake_minimum_required(VERSION 3.13)
project(eosratetoken)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( eosratetoken eosratetoken eosratetoken.cpp )
target_include_directories( eosratetoken PUBLIC ./ )
