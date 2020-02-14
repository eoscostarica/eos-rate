```
Compile contract:
eosio-cpp rateproducer.cpp -o rateproducer.wasm -abigen 

Add resources:
cleos -u http://jungle2.cryptolions.io:80 system buyram rateproducer rateproducer "100 EOS"

Publish Contract:
cleos -u http://jungle2.cryptolions.io:80 set contract rateproducer ./ -p rateproducer@active

Push rating with all categories:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":8,"trustiness":7,"development":6,"community":9 }' -p rateproducer@active

Push rating with partial categories:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":0,"trustiness":0,"development":0,"community":0 }' -p rateproducer@active

Get stats table:
Cleos -u http://jungle2.cryptolions.io:80 get table rateproducer rateproducer stats

Get bp table:
Cleos -u http://jungle2.cryptolions.io:80 get table rateproducer rateproducer ratings

Clean data for a block producer :
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer erase '{"bp_name":"eoscrprodo55"}' -p rateproducer@active

Clean all tables:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer wipe '[]' -p rateproducer@active

```
Run test
you need to assign the priv key for the variable ```rateproducer_priv_key``` within the file test.js 

 execute the following commands: 
 ```
 yarn add eosjs
 yarn install
 yarn test
 yarn test_average
```

