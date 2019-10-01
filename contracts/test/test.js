const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
//const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only

const priv_key_eosio = "5KQwrPbw9zkvFD3"; 
const priv_key_eoseosrateio = "5Je8MieuyofubTbHMFb7W"; 


const signatureProvider = new JsSignatureProvider([priv_key_eosio,priv_key_eoseosrateio]);
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),
    assert = chai.assert;

var utils = require('./utils.js');
const proxy_acc='testproxy111';
const voter_acc='testvoter111';
const user_acc='testvoter111';
const bp_name='testvoter111';

describe ('Eos-rate unit test', function(){
 
    it('Voting with a non proxy account',async () => {
        result = utils.set_proxy( proxy_acc,false); //unset proxy flag
        try {
            const result = await api.transact({
                actions: [{
                  account: 'eoseosrateio',
                  name: 'rateproducer',
                  authorization: [{
                    actor: 'eoseosrateio',
                    permission: 'active',
                  }],
                  data: {
                      //name user, name bp, string ratings_json
                    user: proxy_acc,
                    bp: bp_name,
                    ratings_json: "{\"costaricaeos\":{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10},\"alohaeos\":{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10}}",
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
            assert.equal(errorMessage, 'only proxy accounts are allowed to rate at the moment')
          }
    });

    it('Voting with a  proxy account',async () => {
        result = utils.set_proxy( proxy_acc,true); //set proxy flag
        try {
            const result = await api.transact({
                actions: [{
                  account: 'eoseosrateio',
                  name: 'rateproducer',
                  authorization: [{
                    actor: 'eoseosrateio',
                    permission: 'active',
                  }],
                  data: {
                      //name user, name bp, string ratings_json
                    user: proxy_acc,
                    bp: bp_name,
                    ratings_json: "{\"costaricaeos\":{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10},\"alohaeos\":{\"transparency\":10,\"testnets\":8,\"tooling\":7,\"infra\":6,\"community\":10}}",
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
    
});
