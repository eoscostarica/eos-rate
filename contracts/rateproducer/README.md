```
Compile contract:
eosio-cpp -R ricardian rateproducer.cpp -o rateproducer.wasm -abigen 

Add resources:
cleos -u http://jungle2.cryptolions.io:80 system buyram rateproducer rateproducer "100 EOS"

Publish Contract:
cleos -u http://jungle2.cryptolions.io:80 set contract rateproducer ./ -p rateproducer@active

Push rating with all categories:
example 1:
cleos -u hhttp://jungle2.cryptolions.io:80 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":8,"trustiness":7,"development":6,"community":9 }' -p rateproducer@active

example 2:
cleos -u http://jungle2.cryptolions.io:80 push action rateproducer rate '{ "user": "eoscrvoter11", "bp":"eoscrprodo51","transparency":8,"infrastructure":8,"trustiness":7,"development":6,"community":9 }' -p eoscrvoter11@active

Push rating with partial categories:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":0,"trustiness":0,"development":0,"community":0 }' -p rateproducer@active

Get stats table:
cleos -u http://jungle2.cryptolions.io:80 get table -l 50 rateproducer rateproducer stats

Get bp table:
cleos -u http://jungle2.cryptolions.io:80 get table -l 50 rateproducer rateproducer ratings

Clean data for a block producer :
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer erase '{"bp_name":"eoscrprodo55"}' -p rateproducer@active

Clean all tables:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer wipe '[]' -p rateproducer@active

Clean data from un-register/inactive bp
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rminactive '[]' -p rateproducer@active

Remove a rate
example 1:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rmrate '{"user": "rateproducer", "bp":"alohaeostest"}' -p rateproducer@active

example 2:
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rmrate '{"user": "eoscrvoter11", "bp":"eoscrprodo51"}' -p eoscrvoter11@active

```
Run test
you need to assign the priv key for the variable ```rateproducer_priv_key``` within the file test.js 

 execute the following commands: 
 ```
 yarn add eosjs
 yarn install
 yarn test
 yarn test_average
 yarn test_unreg_bp
```

