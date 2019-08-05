#!/bin/bash
# set -o errexit
export EOSIO_SYSTEM_CONTRACTS_PUB_KEY="EOS5Rc8VJCyNCYPdE4gQhqPMTetFXkJPagkq4dicPCPGTAr5d4qu8"
export WALLET_KEY_PATH="/eos_wallet_key/key.txt"
cleos wallet unlock --password  $(cat ${WALLET_KEY_PATH})
sleep 3
cleos create account eosio eosio.bios ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.msig ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}  
sleep 3
cleos create account eosio eosio.system ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.token ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.wrap ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.bpay ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.names ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.ram ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.ramfee ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY} 
sleep 3 
cleos create account eosio eosio.saving ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.stake ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
sleep 3
cleos create account eosio eosio.vpay ${EOSIO_SYSTEM_CONTRACTS_PUB_KEY}
  