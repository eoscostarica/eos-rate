import { Api, JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

const rpc = new JsonRpc(
  process.env.REACT_APP_EOS_API_URL || 'https://jungle.eosio.cr',
  { fetch }
)

export default { api: Api, rpc }
