import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'

import config from 'config'

export const network = {
  chainId:
    config.eosChainId ||
    'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: config.eosApiProtocol || 'https',
      host: config.eosApiHost || 'jungle.eosio.cr',
      port: parseInt(config.eosApiPort || '443')
    }
  ]
}

const appName = config.appName || 'EOSRate'
const lynx = new Lynx([network])
const ledger = new Ledger([network])
const scatter = new Scatter([network], { appName })

export const authenticators = [lynx, ledger, scatter]
