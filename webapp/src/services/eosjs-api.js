import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { TextEncoder, TextDecoder } from 'text-encoding'
import fetch from 'node-fetch'

const signatureProvider = new JsSignatureProvider([])

const rpc = new JsonRpc(
  process.env.REACT_APP_EOS_API_URL || 'https://jungle.eosio.cr',
  { fetch }
)
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

export default { api, rpc }
