const { massiveDB, CONTRACT_SCOPES } = require('../config')
const eosjs = require('eosjs')
const fetch = require('node-fetch')

const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'


const getBpStats = async (bp, scope) => {
  const rpc = new eosjs.JsonRpc(
    process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr',
    { fetch }
  )
  
  try {
    return await rpc.get_table_rows({
      json: true, // Get the response as json
      code: HAPI_RATING_CONTRACT, // Contract that we target
      scope, // Account that owns the data
      table: 'stats', // Table name
      lower_bound: bp, // block producer PK
      limit: 1, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false // Optional: Show ram payer
    })
  } catch (e) { return e }
}

const updateBpStats = async bpName => {
  CONTRACT_SCOPES.forEach(async (scope) => {
    try {
      const bpStat = await getBpStats(bpName, scope)
  
      if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
        return 'Did not find ratings for BP: ' + bpName
  
      const stat = bpStat.rows[0]

      await updateBpStatsDefault(bpName, stat)
      await updateBpStatsEden(bpName, stat)

    } catch (err) { console.log(`Error: ${err}`) }
  })
}

const updateBpStatsDefault = async (bpName, stat) => {
  const resultRatingsSave = await (await massiveDB).ratings_stats.save(stat)
  const dbResult = resultRatingsSave ? resultRatingsSave : await (await massiveDB).ratings_stats.insert(stat)
  console.log(`Default save or insert of ${bpName} was ${dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'}`)
}

const updateBpStatsEden = async (bpName, stat) => {
  const resultRatingsSave = await (await massiveDB).eden_ratings_stats.save(stat)
  const dbResult = resultRatingsSave ? resultRatingsSave : await (await massiveDB).eden_ratings_stats.insert(stat)
  console.log(`Eden save or insert of ${bpName} was ${dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'}`)
}

module.exports = updateBpStats
