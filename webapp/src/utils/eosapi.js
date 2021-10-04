import EosApi from 'eosjs-api'

import { ualConfig } from '../config'

export const eosApi = EosApi({
  httpEndpoint: ualConfig.endpoint,
  verbose: false,
  fetchConfiguration: {}
})
