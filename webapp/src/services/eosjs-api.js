import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const signatureProvider = new JsSignatureProvider([])

const rpc = new JsonRpc(
  process.env.REACT_APP_EOS_API_URL || 'https://jungle.eosio.cr'
)
const api = new Api({
  rpc,
  signatureProvider
})

export { api, rpc }
