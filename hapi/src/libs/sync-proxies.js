#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const EosApi = require('eosjs-api')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const { massiveDB } = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_PROXY_CONTRACT = process.env.HAPI_PROXY_CONTRACT || 'proxyaccount'

const getProxiesData = async () => {
  console.log('==== Updating proxies ====')
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })
  const eosApi = EosApi({
    httpEndpoint: HAPI_EOS_API_ENDPOINT,
    verbose: false
  })

  let proxies

  try {
    ;({ rows: proxies } = await eos.get_table_rows({
      json: true,
      code: HAPI_PROXY_CONTRACT,
      scope: HAPI_PROXY_CONTRACT,
      table: 'proxies',
      limit: 1000,
      reverse: false,
      show_payer: false
    }))
  } catch (err) {
    console.log(`Database connection error ${err}`)
    return []
  }

  proxies.forEach(async proxy => {
    const account = await eosApi.getAccount({ account_name: proxy.owner })

    if (account && account.voter_info && account.voter_info.is_proxy) {
      proxy.voter_info = account.voter_info

      try {
        const resultProxySave = await (
          await massiveDB
        ).proxies.save({
          ...proxy,
          filter_name: (proxy.name || null).toLowerCase()
        })
        const dbResult =
          resultProxySave || (await (await massiveDB).proxies.insert(proxy))
        console.log(
          `Save or insert of ${proxy.owner} was ${
            dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
          }`
        )
      } catch (err) {
        console.log(`Error: ${err}`)
      }
    } else console.log(`${proxy.owner} is not a proxy`)
  })
}

getProxiesData()
