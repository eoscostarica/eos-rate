import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'

import {
  appName,
  eosChainId,
  eosApiProtocol,
  eosApiHost,
  eosApiPort
} from '../config'

export const network = {
  chainId:
    eosChainId ||
    '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: eosApiProtocol || 'https',
      host: eosApiHost || 'jungle.eosio.cr',
      port: parseInt(eosApiPort || '443')
    }
  ]
}

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
