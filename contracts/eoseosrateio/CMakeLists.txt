cmake_minimum_required(VERSION 3.13)
project(eoseosrateio)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( eoseosrateio eoseosrateio eoseosrateio.cpp )
