#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const massive = require('massive')
const { massiveConfig } = require('../config')

const EOS_API_ENDPOINT = process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_STATS_CONTRACT_CODE = process.env.HAPI_STATS_CONTRACT_CODE || 'rateproducer'
const HAPI_STATS_CONTRACT_SCODE = process.env.HAPI_STATS_CONTRACT_SCODE || 'rateproducer'

const getRatingsStats = async () => {
  const eos = new JsonRpc(EOS_API_ENDPOINT, { fetch })

  const ratings = await eos.get_table_rows({
    json: true,
    code: HAPI_STATS_CONTRACT_CODE,
    scope: HAPI_STATS_CONTRACT_SCODE,
    table: 'stats',
    limit: 1000,
    reverse: false,
    show_payer: false
  })
  
  return ratings
}

const updateRatingsStats = async () => {
  console.log('==== Updating ratings stats ====')
  const db = await massive(massiveConfig)
  const ratingsStats = await getRatingsStats()

  ratingsStats.rows.forEach(async (rating) => {
    try {
      const resultRatingStatsSave = await db.ratings_stats.save(rating)
      const dbResult = resultRatingStatsSave ? resultRatingStatsSave : await db.ratings_stats.insert(rating)
      console.log(`Save or insert of ${rating.bp} was ${dbResult ? 'SUCCESSFULLY' : 'UNSUCCESSFULLY'}`)
    } catch (err) { console.log(`Error: ${err}`) }
  })
}

updateRatingsStats()
