import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'

import config from 'config'

export const network = {
  chainId:
    config.eosChainId,
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: config.eosApiProtocol,
      host: config.eosApiHost,
      port: parseInt(config.eosApiPort)
    }
  ]
}

const appName = config.appName
const lynx = new Lynx([network])
const ledger = new Ledger([network])
const tokenPocket = new TokenPocket([network])
const meetOne = new MeetOne([network.chainId])
const scatter = new Scatter([network], { appName })
const anchor = new Anchor([network], { appName })

export const authenticators = [
  lynx,
  ledger,
  scatter,
  tokenPocket,
  meetOne,
  anchor
]
