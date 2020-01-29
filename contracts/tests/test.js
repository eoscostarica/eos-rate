const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
//const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only

const priv_key_eosio = "5KQwrPbw9zkvFD3"; 
const priv_key_eoseosrateio = "5Je8MieuyofubTbHMFb7W"; 
const rateproducer_priv_key='5HrYs51N1PsqD36hHEPmbQC1Bua4nYTKSRTm2sjA5LeQjJ9gUqN';
const eoseosrateio_priv_key='5Je8MieuyEiGpUB5qZWUUTSmtYcRypqFEccZF2DofubTbHMFb7W';
const prod_pub_key='EOS5Rc8VJCyNCYPdE4gQhqPMTetFXkJPagkq4dicPCPGTAr5d4qu8';

const signatureProvider = new JsSignatureProvider([eoseosrateio_priv_key]);
const rpc = new JsonRpc('http://monitor.jungletestnet.io:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),
    assert = chai.assert;

//var utils = require('./utils.js');
const proxy_acc='testproxy111';
const voter_acc='testvoter111';
const rate_acc='eoseosrateio';
const bp_name='testvoter111';


var bp_accts = ["eoscrprodoo1", "eoscrprodoo2", "eoscrprodoo3","eoscrprodoo4","eoscrprodoo5"];


describe ('Eos-rate unit test', function(){
 
    it('Init (unregister) block producer accounts',async () => {
        
       //for(index =0 ; index < bp_accts.length; index++ ){ 
       //for(index =0 ; index < 1; index++ ){ 
        try {
            const result = await api.transact({
                actions: [{
                  account: 'eosio',
                  name: 'regproducer',
                //  authorization: [{
                //    actor: 'eoseosrateio',
                //    permission: 'owner',
                //  }],
                  data: {
                    account: 'eoscrprodoo1',
		    producer_key: prod_pub_key,
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
//console.log('i: '+ index + bp_accts[index] + '\n');
     // }
    });

/*
    it('eoseosrateio rate 4 costaricaeos',async () => {
       
        try {
            const result = await api.transact({
                actions: [{
                  account: 'eoseosrateio',
                  name: 'rateproducer',
                  authorization: [{
                    actor: 'eoseosrateio',
                    permission: 'owner',
                  }],
                  data: {
                      //name user, name bp, string ratings_json
                    user: 'eoseosrateio',
                    bp: 'eoscostarica',
                    ratings_json: "{\"transparency\":10,\"infrastructure\":8,\"trustiness\":7,\"development\":6,\"community\":10}",
			
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
  */ 
});
