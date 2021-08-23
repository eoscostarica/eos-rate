## Compilation
This contract is built with eden `clsdk` compiler, to have the local environment configured to compile this contract is needed to [take a look at this link](https://github.com/eoscommunity/demo-clsdk) to learn more or follow these steps to continue forward.

## Get Started
### Ubuntu 20.04
Run the following commands to set local environment.
```
sudo apt-get update
sudo apt-get install -yq    \
    binaryen                \
    build-essential         \
    cmake                   \
    gdb                     \
    git                     \
    libboost-all-dev        \
    libcurl4-openssl-dev    \
    libgmp-dev              \
    libssl-dev              \
    libusb-1.0-0-dev        \
    pkg-config              \
    wget


mkdir ~/work

cd ~/work
wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-12/wasi-sdk-12.0-linux.tar.gz
tar xf wasi-sdk-12.0-linux.tar.gz

cd ~/work
wget https://github.com/eoscommunity/Eden/releases/download/sdk-v0.1.0-alpha/clsdk-ubuntu-20-04.tar.gz
tar xf clsdk-ubuntu-20-04.tar.gz
```

Make sure to have the following variables to compile the `rateproducer` contract:
```
export WASI_SDK_PREFIX=~/work/wasi-sdk-12.0
export CLSDK_PREFIX=~/work/clsdk

export PATH=$CLSDK_PREFIX/bin:$PATH
```

Once the previous step is completed, inside of `rateproducer` folder:
```
mkdir build
cd build
cmake `clsdk-cmake-args` ..
make -j
```

Add resources:
```bash
cleos -u https://jungle3.cryptolions.io system buyram rateproducer rateproducer "100 EOS"
```

Publish Contract:
```bash
cleos -u https://jungle3.cryptolions.io set contract rateproducer ./ -p rateproducer@active
```

Push rating with all categories:
example 1:
```bash
cleos -u hhttp://jungle2.cryptolions.io:80 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":8,"trustiness":7,"development":6,"community":9 }' -p rateproducer@active
```

example 2:
```bash
cleos -u https://jungle3.cryptolions.io push action rateproducer rate '{ "user": "eoscrvoter11", "bp":"eoscrprodo51","transparency":8,"infrastructure":8,"trustiness":7,"development":6,"community":9 }' -p eoscrvoter11@active
```

Push rating with partial categories:
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rate '{ "user": "rateproducer", "bp":"alohaeostest","transparency":8,"infrastructure":0,"trustiness":0,"development":0,"community":0 }' -p rateproducer@active
```

Get stats table:
```bash
cleos -u https://jungle3.cryptolions.io get table -l 50 rateproducer rateproducer stats
```

Get bp table:
```bash
cleos -u https://jungle3.cryptolions.io get table -l 50 rateproducer rateproducer ratings
```

Clean data for a block producer:
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer erase '{"bp_name":"eoscrprodo55"}' -p rateproducer@active
```

Clean all tables:
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer wipe '[]' -p rateproducer@active
```

Clean data from un-register/inactive bp
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rminactive '[]' -p rateproducer@active
```

Remove a rate
example 1:
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rmrate '{"user": "rateproducer", "bp":"alohaeostest"}' -p rateproducer@active
```

example 2:
```bash
cleos -u http://monitor.jungletestnet.io:8888 push action rateproducer rmrate '{"user": "eoscrvoter11", "bp":"eoscrprodo51"}' -p eoscrvoter11@active
```


Run test
you need to assign the priv key for the variable ```rateproducer_priv_key``` within the file test.js

Execute the following commands:

```
 yarn add eosjs
 yarn install
 yarn test
 yarn test_average
 yarn test_unreg_bp
```