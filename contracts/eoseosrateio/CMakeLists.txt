cmake_minimum_required(VERSION 3.5)
project(eoseosrateio VERSION 1.0.0)

find_package(eosio.cdt)

### Only generate the wasm
#add_executable( eoseosrateio.wasm eoseosrateio.cpp )

### Generate the wasm and abi
add_contract( eoseosrateio eoseosrateio eoseosrateio.cpp)
