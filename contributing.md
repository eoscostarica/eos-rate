# Contributing

We follow EOS Costa Rica's Open Source Contributing Guidelines.

https://developers.eoscostarica.io/docs/open-source-guidelines

# Branches

## master branch :

* is hosted on k8s, production namespace
* should be configured via env vars to point to the EOS mainnet endpoint: e.g. https://api.eosargentina.io/
* domain: https://eosrate.io

## staging branch :

* is hosted on k8s, testing namespace
* should be configured via env vars to point to the JUNGLE testnet endpoint: https://jungle.eosio.cr
* domain: https://jungle.eosrate.io:8080
