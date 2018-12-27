#! /bin/bash
cd /opt/application/contracts/eoseosrateio
eosio-cpp -abigen eoseosrateio.cpp -o eoseosrateio.wasm
