
exports.set_proxy =  async (account_name,proxy_flag) => {
    const { Api, JsonRpc, RpcError } = require('eosjs');
    const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
    const fetch = require('node-fetch');                                    // node only; not needed in browsers
    const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

    const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; 
    const defaultPrivateKey2 = "5KCAbWSnFTNgYp1eyzzEWnrKTCdv3sZr4VwKioY7n9afGpekR5U";
    const defaultPrivateKey3 = "5KGTxK8CrkXiTK2ocJdB4Tsm25syD5Kz5UvfNgDWPv3Xw6aLE1J";

    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    try {
        const result = await api.transact({
            actions: [{
              account: 'eosio',
              name: 'regproxy',
              authorization: [{
                actor: account_name,
                permission: 'active',
              }],
              data: {
                proxy: account_name,
                isproxy: proxy_flag,
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
      } catch (e) {
        
      }
}