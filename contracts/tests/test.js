const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
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
var bp_accts_10 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25"
                 ];

describe ('Eos-rate unit test', function(){
    
    it('Rating using '+ voter_acc +' account with out-rage values ',async () => {
        for (i = 0; i < 10; i++) {
            var transparency_val = 3;
            var infrastructure_val = 8;
            var trustiness_val = 7;
            var development_val = 6;
            var community_val = 9;
            switch(i) {
                case 0:
                    transparency_val = MAX_VAL + Math.floor(Math.random() * 10)+1;
                break;
                case 1:
                    transparency_val = MIN_VAL -(Math.floor(Math.random() * 10)+1);
                break;
                case 2:
                    infrastructure_val = MAX_VAL + Math.floor(Math.random() * 10)+1;
                break;
                case 3:
                    infrastructure_val = MIN_VAL -(Math.floor(Math.random() * 10)+1);
                break;
                case 4:
                    trustiness_val = MAX_VAL + Math.floor(Math.random() * 10)+1;
                break;
                case 5:
                    trustiness_val = MIN_VAL -(Math.floor(Math.random() * 10)+1);
                break;
                case 6:
                    development_val = MAX_VAL + Math.floor(Math.random() * 10)+1;
                break;
                case 7:
                    development_val = MIN_VAL -(Math.floor(Math.random() * 10)+1);
                break;
                case 8:
                    community_val = MAX_VAL + Math.floor(Math.random() * 10)+1;
                break;
                case 9:
                    community_val = MIN_VAL -(Math.floor(Math.random() * 10)+1);
                break;
            }
            
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
                        bp: 'eoscostarica',
                        transparency:transparency_val,
                        infrastructure:infrastructure_val,
                        trustiness:trustiness_val,
                        development:development_val,
                        community:community_val,
                      },
                    }]
                  }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                  });
              } catch (err) {
                 
                let errorMessage =  get(err, 'json.error.details[0].message')
                errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
                assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
                assert.notEqual(errorMessage.search("value out of range"), -1)
                  
              }
        }
    });
    
    it('Rating using '+voter_acc+' for an unregister block producer',async () => {
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
                    bp: 'nobody',
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
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'votes are allowed only for registered block producers')
          }
    });
    
    it('Register accounts as block producers',async () => {

    for(index =0 ; index < bp_accts_25.length; index++ ){  
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
    
    it('Remove votes/proxies from '+voter_acc+' account',async () => {
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
                  producers: []
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

    it('Remove votes/proxies from '+proxy_acc+' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: []
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
 
   
    it('Rating using '+ voter_acc +' account with no voters ',async () => {
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
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'account does not have enough voters')
          }
    });

    it('Register account ' +proxy_acc+ ' as proxy ',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproxy',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  proxy: proxy_acc,
                  isproxy: true,
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

    it('Set up ' + proxy_acc + ' as proxy for '+voter_acc+' account',async () => {
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
                  proxy: proxy_acc,
                  producers: []
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



    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy without voters',async () => {
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
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'delegated proxy does not have enough voters')
          }
    });

    it('Set up 10 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: bp_accts_10,
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

    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy with 10 voters',async () => {
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
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'delegated proxy does not have enough voters')
          }
    });

    it('Set up 21 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
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

    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy with 21 voters',async () => {
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

    it('Set up 25 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: bp_accts_25,
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

    it('Rating using '+voter_acc+' and '+proxy_acc+'as proxy with 25 voters',async () => {
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

    it('Set up 10 voters for ' + voter_acc + ' account',async () => {
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
                  producers: bp_accts_10,
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

    it('Rating using '+voter_acc+' account with 10 voters',async () => {
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
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'account does not have enough voters')
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

    it('Rating using '+voter_acc+' account with 21 voters',async () => {
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

    it('Set up 25 voters for ' + voter_acc + ' account',async () => {
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
                  producers: bp_accts_25,
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

    it('Rating using '+voter_acc+' account with 25 voters',async () => {
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

    it('Unregister account '+proxy_acc+' as proxy',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproxy',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  proxy: proxy_acc,
                  isproxy: false
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {

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
