const { massiveDB } = require('../config')
const eosjs = require('eosjs')
const fetch = require('node-fetch')

const rpc = new eosjs.JsonRpc(
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr',
  { fetch }
)

const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

// Read from Blockchain
const getBpStats = async bp => {
  let result
  try {
    result = await rpc.get_table_rows({
      json: true, // Get the response as json
      code: HAPI_RATING_CONTRACT, // Contract that we target
      scope: HAPI_RATING_CONTRACT, // Account that owns the data
      table: 'stats', // Table name
      lower_bound: bp, // block producer PK
      limit: 1, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false // Optional: Show ram payer
    })
  } catch (e) {
    result = e
  }

  return result
}

/// Save to DB
const updateBpStats = async bpName => {
  try {
    const bpStat = await getBpStats(bpName)

    if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
      return 'Did not find ratings for BP: ' + bpName

    const stat = bpStat.rows[0]

    const resultRatingsSave = await (await massiveDB).ratings_stats.save(stat)
    const dbResult = resultRatingsSave ? resultRatingsSave : await (await massiveDB).ratings_stats.insert(stat)
    console.log(`Save or insert of ${bpName} was ${dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'}`)
  } catch (err) { console.log(`Error: ${err}`) }
}

module.exports = updateBpStats
