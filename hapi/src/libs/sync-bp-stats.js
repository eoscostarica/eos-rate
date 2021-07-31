const massive = require('massive')
const { massiveConfig } = require('../config')
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
  let message
  const updateStat = async stat => {
    await massive(massiveConfig).then(async db => {
      const blockProducerStat = await db.ratings_stats.findOne({ bp: stat.bp })

      if (blockProducerStat && blockProducerStat.bp) {
        await db.ratings_stats.save(stat)
        message = 'updated rating for ' + bpName
      } else {
        await db.ratings_stats.insert(stat)
        message = 'inserted rating for ' + bpName
      }
    })
  }

  const bpStat = await getBpStats(bpName)

  if (bpStat.rows.length && bpStat.rows[0].bp === bpName) {
    message += await updateStat(bpStat.rows[0])
  } else {
    message = 'Did not find ratings for BP: ' + bpName
  }
  console.log(message)
  return message
}

module.exports = updateBpStats