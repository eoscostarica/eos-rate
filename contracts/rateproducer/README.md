```
Compile contract:
eosio-cpp rateproducer.cpp -o rateproducer.wasm -abigen -I {CONTRACT PATH}

Add resources:
cleos -u http://jungle2.cryptolions.io:80 system buyram rateproducer rateproducer "100 EOS"

Publish Contract:
cleos -u http://jungle2.cryptolions.io:80 set contract rateproducer ./ -p rateproducer@active

Push rating with all categories:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp": "alohaeostest", "ratings_json": "{\"transparency\":8,\"infrastructure\":8,\"trustiness\":7,\"development\":6,\"community\":9}" }' -p rateproducer@active

Push rating with partial categories:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp": "alohaeostest", "ratings_json": "{\"transparency\":8,\"infrastructure\":10}" }' -p rateproducer@active

Get stats table:
Cleos -u http://jungle2.cryptolions.io:80 get table rateproducer rateproducer stats

Get bp table:
Cleos -u http://jungle2.cryptolions.io:80 get table rateproducer rateproducer bp

Clean stats table:
cleos -u http://jungle2.cryptolions.io:80 push action rateproducer erase '{"table":"stats"}' -p rateproducer@active

Clean bp table:
cleos -u http://jungle2.cryptolions.io:80 push action rateproducer erase '{"table":"stats"}' -p rateproducer@active


```
