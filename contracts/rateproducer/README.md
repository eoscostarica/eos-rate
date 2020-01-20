```

eosio-cpp rateproducer.cpp -o rateproducer.wasm -abigen

cleos -u http://jungle2.cryptolions.io:80 system buyram rateproducer rateproducer "100 EOS"

cleos -u http://jungle2.cryptolions.io:80 set contract rateproducer ./ -p rateproducer@active

cleos -u http://jungle2.cryptolions.io:80 push action rateproducer rate '{}' -p rateproducer@active

cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp": "alohaeostest", "ratings_json": "{\"transparency\":8,\"infrastructure\":10}" }' -p rateproducer@active

```