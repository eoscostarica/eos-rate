#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const massive = require('massive')

const dbConfig = require('./dbConfig')

const EOS_API_ENDPOINT = process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'

// gets data from blockchain
const getRatingsStats = async () => {
  const eos = new JsonRpc(EOS_API_ENDPOINT, { fetch })

  const ratings = await eos.get_table_rows({
    json: true,
    code: 'rateproducer',
    scope: 'rateproducer',
    table: 'stats',
    limit: 1000,
    reverse: false,
    show_payer: false
  })
  // console.log(ratings)
  return ratings
}

// updates the postgresdb
const updateRatingsStats = async () => {
  console.log('==== updating ratings stats ====')
  const db = await massive(dbConfig)
  const ratingsStats = await getRatingsStats()

  const saveRatings = async (rating) => {
    console.log('updating... ', rating)

    try {
      const result = await db.ratings_stats.save(rating)
      if (!result) {
        const insertResult = await db.ratings_stats.insert(rating)
        if (!insertResult) {
          console.log(`couldnt save or insert ${rating.bp}`)
          return
        }
      }
      console.log(`succefully saved ${rating.bp}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  for (let rating of ratingsStats.rows) {
    await saveRatings(rating)
  }

  // TODO : better error handling, report and retry unfulffilled
};

(async () => {
  try {
    console.log('Updating Ratings Stats')
    await updateRatingsStats()
    console.log('OK')
    process.exit(0)
  } catch (err) {
    console.log('!!!!', err)
  }
})()
