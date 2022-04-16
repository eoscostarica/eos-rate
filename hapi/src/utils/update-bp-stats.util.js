const {
  massiveDB,
  generalContractScope,
  edenContractScope
} = require('../config')
const getTotalStats = require('./get-total-stats')
const eosjs = require('eosjs')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getBpStats = async (bp, scope) => {
  const rpc = new eosjs.JsonRpc(
    process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.edenia.cloud',
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

const updateBpStats = async bpName => {
  try {
    const edenStats = await getEdenBpStats(bpName)
    const edenResult = await updateBpStatsEden(bpName, edenStats)

    const generalStats = await getGeneralBpStats(bpName)
    await updateBpStatsGeneral(bpName, generalStats)

    const totalStats = getTotalStats({
      producerData: generalStats,
      edenStats,
      statsAmount: 5,
      oneStat: 1
    })
    await updateBpStatsTotal(bpName, { ...totalStats, bp: bpName })

    return { edenResult, totalStats }
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

const getEdenBpStats = async bpName => {
  try {
    const bpStat = await getBpStats(bpName, edenContractScope)

    if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
      return 'Did not find ratings for BP: ' + bpName

    const stat = bpStat.rows[0]

    return stat
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

const getGeneralBpStats = async bpName => {
  try {
    const bpStat = await getBpStats(bpName, generalContractScope)

    if (!bpStat.rows.length || !bpStat.rows[0].bp === bpName)
      return 'Did not find ratings for BP: ' + bpName

    const stat = bpStat.rows[0]

    return stat
  } catch (err) {
    console.error(`sync-bp-stats: ${err}`)
  }
}

const updateBpStatsTotal = async (bpName, stat) => {
  const db = await massiveDB
  const resultRatingsSave = await db.total_ratings_stats.save(stat)
  const dbResult =
    resultRatingsSave || (await db.total_ratings_stats.insert(stat))
  console.log(
    `Total rating save or insert of ${bpName} was ${
      dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
    }`
  )
}

const updateBpStatsGeneral = async (bpName, stat) => {
  const db = await massiveDB
  const resultRatingsSave = await db.ratings_stats.save(stat)
  const dbResult = resultRatingsSave || (await db.ratings_stats.insert(stat))
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
    const dbResult =
      resultRatingsSave || (await db.eden_ratings_stats.insert(stat))
    console.log(
      `Eden save or insert of ${bpName} was ${
        dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
      }`
    )

    return {
      bp: dbResult.bp,
      average: dbResult.average,
      ratings_cntr: dbResult.ratings_cntr,
      transparency: dbResult.transparency,
      infrastructure: dbResult.infrastructure,
      trustiness: dbResult.trustiness,
      community: dbResult.community,
      development: dbResult.development
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

module.exports = updateBpStats
