const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
//const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only

const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // bob
const defaultPrivateKey2 = "5KCAbWSnFTNgYp1eyzzEWnrKTCdv3sZr4VwKioY7n9afGpekR5U";
const defaultPrivateKey3 = "5KGTxK8CrkXiTK2ocJdB4Tsm25syD5Kz5UvfNgDWPv3Xw6aLE1J";

const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

var chai = require('chai'),
    assert = chai.assert;

describe ('Esto es un conjunto de pruebas', function(){
    it('prueba de la suma',function(){
        assert.equal(20,20);
    });
    it('prueba de la suma 2',function(){
        assert.equal(20,20);
    });
    it('prueba de la suma 3',function(){
        assert.equal(20,20);
    });
    it('prueba de la suma 4',function(){
        assert.equal(20,20);
    });

    it('Register a proxy',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: 'eosio',
                  name: 'regproxy',
                  authorization: [{
                    actor: 'testproxy111',
                    permission: 'active',
                  }],
                  data: {
                    proxy: 'testproxy111',
                    isproxy: true,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (e) {
            console.log('\nCaught exception: ' + e);
            if (e instanceof RpcError)
              console.log(JSON.stringify(e.json, null, 2));
          }
    });
    
});