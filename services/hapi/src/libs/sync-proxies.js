#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const EosApi = require('eosjs-api')
const fetch = require('node-fetch')
const massive = require('massive')
const { massiveConfig } = require('../config')

const EOS_API_ENDPOINT = process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const PROXY_INFO_CONTRACT_CODE = process.env.PROXY_INFO_CONTRACT_CODE || 'proxyaccount'
const PROXY_INFO_CONTRACT_SCOPE = process.env.PROXY_INFO_CONTRACT_SCOPE || 'proxyaccount'


const getProxiesData = async () => {
  const db = await massive(massiveConfig)
  const eos = new JsonRpc(EOS_API_ENDPOINT, { fetch })
  const eosApi = EosApi({
    httpEndpoint: EOS_API_ENDPOINT,
    verbose: false
  })

  const { rows: proxies } = await eos.get_table_rows({
    json: true,
    code: PROXY_INFO_CONTRACT_CODE,
    scope: PROXY_INFO_CONTRACT_SCOPE,
    table: 'proxies',
    limit: 1000,
    reverse: false,
    show_payer: false
  })

  proxies.forEach(async (proxy) => {
    const account = await eosApi.getAccount({ account_name: proxy.owner })

    if (account && account.voter_info && account.voter_info.is_proxy) {
      proxy.voter_info = account.voter_info
      try {
        const resultProxySave = await db.proxies.save(proxy)
        const dbResult = resultProxySave ? resultProxySave : await db.proxies.insert(proxy)
        console.log(`Save or insert of ${proxy.owner} was ${dbResult ? 'SUCCESSFULLY' : 'UNSUCCESSFULLY'}`)
      } catch (error) { console.log('error', error) }
    } else console.log(`${proxy.owner} is not a proxy`)
  })
}

getProxiesData()
