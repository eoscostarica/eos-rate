import { JsonRpc } from 'eosjs'

const getRpc = ual => {
  const endpoint = ual.chains[0].rpcEndpoints[0]

  const rpcEndpoint = ual.activeUser.buildRpcEndpoint(endpoint)

  return new JsonRpc(rpcEndpoint)
}

const getAccountName = async ual => {
  return await ual.activeUser.getAccountName(ual)
}

export { getRpc, getAccountName }
