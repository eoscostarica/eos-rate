const {
  massiveDB,
  generalContractScope,
  edenContractScope
} = require('../config')
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
  } catch (e) {
    return e
  }
}

const updateBpStats = async (bpName) => {
  try {
    const edenResult = await getEdenBpStats(bpName)
    await getGeneralBpStats(bpName)

    return edenResult
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

<<<<<<< HEAD
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
=======
const getEdenBpStats = async (bpName) => {
  try {
    const bpStat = await getBpStats(bpName, edenContractScope)

    if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
      return 'Did not find ratings for BP: ' + bpName

    const stat = bpStat.rows[0]
    const edenResult = await updateBpStatsEden(bpName, stat)

    return edenResult
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

const getGeneralBpStats = async (bpName) => {
  try {
    const bpStat = await getBpStats(bpName, generalContractScope)

    if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
      return 'Did not find ratings for BP: ' + bpName

    const stat = bpStat.rows[0]

    return await updateBpStatsGeneral(bpName, stat)
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

const updateBpStatsGeneral = async (bpName, stat) => {
  const db = await massiveDB
  const resultRatingsSave = await db.ratings_stats.save(stat)
  const dbResult = resultRatingsSave
    ? resultRatingsSave
    : await db.ratings_stats.insert(stat)
  console.log(
    `General save or insert of ${bpName} was ${
      dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
    }`
  )
}

const updateBpStatsEden = async (bpName, stat) => {
  try {
    const db = await massiveDB
    const resultRatingsSave = await db.eden_ratings_stats.save(stat)
    const dbResult = resultRatingsSave
      ? resultRatingsSave
      : await db.eden_ratings_stats.insert(stat)
    console.log(
      `Eden save or insert of ${bpName} was ${
        dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
      }`
    )
    return { bp: dbResult.bp, average: dbResult.average, ratings_cntr: dbResult.ratings_cntr }
  } catch (error) {
    console.log('Error:', error)
  }
>>>>>>> b4d2b30f18526b307d8b910ac965306b6f7eb303
}

module.exports = updateBpStats
