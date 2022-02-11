import { TokenPocket } from 'ual-token-pocket'
import { Anchor } from 'ual-anchor'
import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { Metamask } from 'ual-metamask'
import { MeetOne } from 'ual-meetone'
import { Wombat } from 'ual-wombat'

export const endpoint = `${process.env.REACT_APP_EOS_API_PROTOCOL}://${
  process.env.REACT_APP_EOS_API_HOST
}${process.env.REACT_APP_EOS_API_PORT ? ':' : ''}${
  process.env.REACT_APP_EOS_API_PORT
}`
export const appName = process.env.REACT_APP_UAL_APP_NAME || 'app'
export const network = {
  chainId: process.env.REACT_APP_EOS_CHAIN_ID || '',
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: process.env.REACT_APP_EOS_API_PROTOCOL,
      host: process.env.REACT_APP_EOS_API_HOST,
      port: parseInt(process.env.REACT_APP_EOS_API_PORT)
    }
  ]
}
export const authenticators = [
  new TokenPocket([network]),
  new Anchor([network], { appName }),
  new Lynx([network]),
  new Ledger([network]),
  new MeetOne([network.chainId]),
  new Scatter([network], { appName }),
  new Wombat([network], { appName }),
  new Metamask([network])
]
