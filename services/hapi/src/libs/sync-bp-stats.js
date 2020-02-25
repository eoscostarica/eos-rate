const massive = require('massive')
const dbConfig = require('../config/dbConfig')
const eosjs = require('eosjs')
const fetch = require('node-fetch')

const rpc = new eosjs.JsonRpc(process.env.REACT_APP_EOS_API_URL || 'https://jungle.eosio.cr', { fetch })

// Read from Blockchain
const getBpStats = async bp => {
  const response = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: 'rateproducer', // Contract that we target
    scope: 'rateproducer', // Account that owns the data
    table: 'stats', // Table name
    lower_bound: bp, // block producer PK
    limit: 1, // Maximum number of rows that we want to get
    reverse: false, // Optional: Get reversed data
    show_payer: false // Optional: Show ram payer
  })

  return response
}

/// Save to DB
const updateBpStats = async (bpName) => {
  const updateStat = async stat => {
    await massive(dbConfig).then(async db => {
      const blockProducerStat = await db.ratings_stats.findOne({ bp: stat.bp })
      if (blockProducerStat && blockProducerStat.bp) {
        await db.ratings_stats.save(stat)
        console.log("updated rating for " + bpName)
      } else {
        await db.ratings_stats.insert(stat)
        console.log("insert rating for " + bpName)
      }
    })
  }

  const bpStat = await getBpStats(bpName)

  if (bpStat.rows.length) {
    await updateStat(bpStat.rows[0])
  }
}

module.exports =  updateBpStats
