#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const massive = require('massive')

const { massiveConfig } = require('../config')

const EOS_API_ENDPOINT = process.env.EOS_API_ENDPOINT || 'https://jungle.eosio.cr'

// gets data from blockchain
const getUserRatings = async () => {
  const eos = new JsonRpc(EOS_API_ENDPOINT, { fetch })

  let ratings = await eos.get_table_rows({
    json: true,
    code: 'rateproducer',
    scope: 'rateproducer',
    table: 'ratings',
    limit: 1000,
    reverse: false,
    show_payer: false
  })
  //console.log(ratings)
  return ratings
}

// updates the postgresdb
const updateUserRatings = async () => {
  console.log('==== updating user ratings ====')
  const db = await massive(massiveConfig)
  const userRatings = await getUserRatings()

  const saveRatings = async (rating) => {
    //console.log('updating... ', rating)

    let ratings = {
      transparency: rating.transparency || 0,
      infrastructure: rating.infrastructure || 0,
      trustiness: rating.trustiness || 0,
      development: rating.development || 0,
      community: rating.community || 0
    }

    try {
      const result = await db.user_ratings.save({
        uniq_rating: rating.uniq_rating,
        user: rating.user,
        bp: rating.bp,
        ratings: ratings
      })
      if (!result) {
        const insertResult = await db.user_ratings.insert({
        uniq_rating: rating.uniq_rating,
        user: rating.user,
        bp: rating.bp,
        ratings
      })
        if (!insertResult) {
          console.log(`could not save or insert ${rating.uniq_rating}`)
          return
        }
      }
      console.log(`succefully saved ${rating.uniq_rating}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  for (let rating of userRatings.rows) {
    await saveRatings(rating)
  }

  // TODO : better error handling, report and retry unfulffilled
};

(async () => {
  try {
     console.log('Updating User Ratings')
    await updateUserRatings()
    console.log('OK')
    process.exit(0)
  } catch (err) {
    console.log('!!!!', err)
  }
})()
