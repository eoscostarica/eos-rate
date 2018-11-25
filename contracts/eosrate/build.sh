#! /bin/bash
cd /opt/application/contracts/eosrate
eosio-cpp -abigen eosrate.cpp -o eosrate.wasm
