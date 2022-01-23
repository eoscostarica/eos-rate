#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
  generalContractScope,
  edenContractScope,
  massiveDB
} = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getUserRatings = async scope => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

  try {
    const ratings = await eos.get_table_rows({
      json: true,
      code: HAPI_RATING_CONTRACT,
      scope: scope,
      table: 'rating',
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
  console.log(`==== Updating ratings ====`)

  const db = await massiveDB
  if (!db) throw new Error('Missing massive instance')

  const generalRatings = await getUserRatings(generalContractScope)
  const edenRatings = await getUserRatings(edenContractScope)
  const allRatings = [...generalRatings.rows, ...edenRatings.rows]

  for (const singleRating of allRatings) {
    const { user, bp, ...ratings } = singleRating
    const ratingsCore = { user, bp, ratings }

    try {
      const resultRatingsSave = await db.user_ratings.save(ratingsCore)
      const dbResult = resultRatingsSave
        ? resultRatingsSave
        : await db.user_ratings.insert(ratingsCore)
      console.log(
        `Save or insert of ${ratingsCore.user}-${ratingsCore.bp} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
}

updateUserRatings()
