const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))                                // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const contract_acct="rateproducer";
const proxy_acc='eoscrprox111';
const voter_acc='eoscrvoter11';

const rateproducer_priv_key='5HrYs51N1Psq...m2sjA5LeQjJ9gUqN';
const rateproducer_pub_key='EOS7Ca5Tc4KaEYLZdu2WxdQQktVePjFiDg42EmMAjqVR6eNKPMrAA';
const MIN_VAL = 0;
const MAX_VAL = 10;

const signatureProvider = new JsSignatureProvider([rateproducer_priv_key]);
const rpc = new JsonRpc('http://monitor.jungletestnet.io:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),assert = chai.assert;


var bp_accts_25 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25",
                "eoscrprodo31","eoscrprodo32","eoscrprodo33","eoscrprodo34","eoscrprodo35",
                "eoscrprodo41","eoscrprodo42","eoscrprodo43","eoscrprodo44","eoscrprodo45",
                "eoscrprodo51","eoscrprodo52","eoscrprodo53","eoscrprodo54","eoscrprodo55"
                 ];

var bp_accts_21 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25",
                "eoscrprodo31","eoscrprodo32","eoscrprodo33","eoscrprodo34","eoscrprodo35",
                "eoscrprodo41","eoscrprodo42","eoscrprodo43","eoscrprodo44","eoscrprodo45",
                "eoscrprodo51"
                 ];


describe ('Eos-rate unit test', function(){
    
    
    
    it('Register accounts as block producers',async () => {

    for( index = 0; index < bp_accts_25.length; index++ ) {  
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproducer',
                authorization: [{
                  actor: bp_accts_25[index],
                  permission: 'active',
                }],
                data: {
                  producer: bp_accts_25[index],
                  producer_key : rateproducer_pub_key,
                  url:'https://eoscostarica.io',
                  location:'0',
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
          console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    }
    });
    

    
    it('Set up 21 voters for ' + voter_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: '',
                  producers: bp_accts_21,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    
    it("Removing previous inactive bp data",async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rminactive',
                  authorization: [{
                    actor: contract_acct,
                    permission: 'active',
                  }],
                  data: {                   
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
              
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it("Test zero inactive bp ",async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rminactive',
                  authorization: [{
                    actor: contract_acct,
                    permission: 'active',
                  }],
                  data: {                   
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
              var action_echo =result["processed"]["action_traces"][0]["console"];
              var pos = action_echo.indexOf(":");
              assert(pos>0, 'error within bps deleted:  tag ');
              var num_bps = action_echo.substring(pos+1);
              assert(num_bps==0, ' Error expected zero as returned value');
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it(voter_acc + ' rating for ' + bp_accts_25[0],async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it('Unregister bp ' + bp_accts_25[0],async () => {

        
          try {
              const result = await api.transact({
                  actions: [{
                    account: 'eosio',
                    name: 'unregprod',
                    authorization: [{
                      actor: bp_accts_25[0],
                      permission: 'active',
                    }],
                    data: {
                      producer: bp_accts_25[0],
                    },
                  }]
                }, {
                  blocksBehind: 3,
                  expireSeconds: 30,
                });
            } catch (err) {
             console.log('\nCaught exception: ' + err);
              if (err instanceof RpcError)
                console.log(JSON.stringify(err.json, null, 2));
            }
        
    });
    
    it("Test one inactive bp ",async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rminactive',
                  authorization: [{
                    actor: contract_acct,
                    permission: 'active',
                  }],
                  data: {                   
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
              var action_echo =result["processed"]["action_traces"][0]["console"];
              var pos = action_echo.indexOf(":");
              assert(pos>0, 'error within bps deleted:  tag ');
              var num_bps = action_echo.substring(pos+1);
              assert(num_bps==1, ' Error expected 1 as returned value');
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it(voter_acc + ' rating for ' + bp_accts_25[1],async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[1],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it(voter_acc + ' rating for ' + bp_accts_25[2],async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[2],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    it('Unregister bp ' + bp_accts_25[1],async () => {

        
          try {
              const result = await api.transact({
                  actions: [{
                    account: 'eosio',
                    name: 'unregprod',
                    authorization: [{
                      actor: bp_accts_25[1],
                      permission: 'active',
                    }],
                    data: {
                      producer: bp_accts_25[1],
                    },
                  }]
                }, {
                  blocksBehind: 3,
                  expireSeconds: 30,
                });
            } catch (err) {
             console.log('\nCaught exception: ' + err);
              if (err instanceof RpcError)
                console.log(JSON.stringify(err.json, null, 2));
            }
        
    });
    
    it('Unregister bp ' + bp_accts_25[2],async () => {

        
          try {
              const result = await api.transact({
                  actions: [{
                    account: 'eosio',
                    name: 'unregprod',
                    authorization: [{
                      actor: bp_accts_25[2],
                      permission: 'active',
                    }],
                    data: {
                      producer: bp_accts_25[2],
                    },
                  }]
                }, {
                  blocksBehind: 3,
                  expireSeconds: 30,
                });
            } catch (err) {
             console.log('\nCaught exception: ' + err);
              if (err instanceof RpcError)
                console.log(JSON.stringify(err.json, null, 2));
            }
        
    });
    
    it("Test two inactive bp ",async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rminactive',
                  authorization: [{
                    actor: contract_acct,
                    permission: 'active',
                  }],
                  data: {                   
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
              var action_echo =result["processed"]["action_traces"][0]["console"];
              var pos = action_echo.indexOf(":");
              assert(pos>0, 'error within bps deleted:  tag ');
              var num_bps = action_echo.substring(pos+1);
              assert(num_bps==2, ' Error expected 2 as returned value');
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });
    
    

 

    it('Unregister producers accounts',async () => {

    for(index =0 ; index < bp_accts_25.length; index++ ){  
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'unregprod',
                authorization: [{
                  actor: bp_accts_25[index],
                  permission: 'active',
                }],
                data: {
                  producer: bp_accts_25[index],
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    }
    });

 
});
