#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const EosApi = require('eosjs-api')
const fetch = require('node-fetch')
const massive = require('massive')

const dbConfig = require('../config/dbConfig')

const EOS_API_ENDPOINT =
  process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'

// gets data from blockchain
const getProxiesData = async () => {
  const db = await massive(dbConfig)
  const eos = new JsonRpc(EOS_API_ENDPOINT, { fetch })
  const eosApi = EosApi({
    httpEndpoint: EOS_API_ENDPOINT,
    verbose: false
  })

  const { rows: proxies } = await eos.get_table_rows({
    json: true,
    code: process.env.PROXY_INFO_CONTRACT_CODE,
    scope: process.env.PROXY_INFO_CONTRACT_SCOPE,
    table: 'proxies',
    limit: 1000,
    reverse: false,
    show_payer: false
  })

  const getProxyAccount = async (proxy, i) => {
    let account = await eosApi.getAccount({ account_name: proxy.owner })

    if (account.voter_info.is_proxy) {
      proxies[i].voter_info = account.voter_info
      try {
        const result = await db.proxies.save(proxies[i])
        if (!result) {
          const insertResult = await db.proxies.insert(proxies[i])
          if (!insertResult) {
            console.log(`couldnt save or insert ${proxies[i].owner}`)
            return
          }
        }
        console.log(`succefully saved ${proxies[i].owner}`)
      } catch (error) {
        console.log('error', error)
      }
    } else {
      //proxies.splice(i, 1)
      console.log(proxies[i].owner + ' is not a proxy')
    }
  }

  proxies.forEach(getProxyAccount)
  return proxies
}

getProxiesData()
