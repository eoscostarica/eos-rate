#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const massive = require('massive')
const { massiveConfig } = require('../config')

const HAPI_EOS_API_ENDPOINT = process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getUserRatings = async () => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

  try {
    const ratings = await eos.get_table_rows({
      json: true,
      code: HAPI_RATING_CONTRACT,
      scope: HAPI_RATING_CONTRACT,
      table: 'ratings',
      limit: 1000,
      reverse: false,
      show_payer: false
    })

    return ratings
  } catch (err) { 
    console.log(`Database connection error ${err}`)
    return []
  }
}

const updateUserRatings = async () => {
  console.log('==== Updating user ratings ====')
  const db = await massive(massiveConfig)
  const userRatings = await getUserRatings()

  userRatings.rows.forEach(async (rating) => {
    const ratingsCore = {
      uniq_rating: rating.uniq_rating,
      user: rating.user,
      bp: rating.bp,
      ratings: {
        transparency: rating.transparency || 0,
        infrastructure: rating.infrastructure || 0,
        trustiness: rating.trustiness || 0,
        development: rating.development || 0,
        community: rating.community || 0
      }
    }

    try {
      const resultRatingsSave = await db.user_ratings.save(ratingsCore)
      const dbResult = resultRatingsSave ? resultRatingsSave : await db.user_ratings.insert(ratingsCore)
      console.log(`Save or insert of ${ratingsCore.uniq_rating} was ${dbResult ? 'SUCCESSFULLY' : 'UNSUCCESSFULLY'}`)
    } catch (err) { console.log(`Error: ${err}`) }
  })
};

updateUserRatings()
