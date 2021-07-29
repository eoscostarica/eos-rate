echo 'Compiling rateproducer Smart Contract'

eosio-cpp -abigen -I ../rateproducer/include -R ../rateproducer/ricardian -contract rateproducer -o rateproducer.wasm ../rateproducer/src/rateproducer.cpp