#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const {
  generalContractScope,
  edenContractScope,
  massiveDB
} = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getUserRatings = async (scope) => {
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

const updateUserRatingsAux = async (scope) => {
  console.log(`==== Updating ratings for ${scope} ====`)
  const userRatings = await getUserRatings(scope)

  userRatings.rows.forEach(async (rating) => {
    const ratingsCore = {
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
      const resultRatingsSave = await (
        await massiveDB
      ).user_ratings.save(ratingsCore)
      const dbResult = resultRatingsSave
        ? resultRatingsSave
        : await (await massiveDB).user_ratings.insert(ratingsCore)
      console.log(
        `Save or insert of ${ratingsCore.user}-${ratingsCore.bp} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  })
}

const updateUserRatings = () => {
  updateUserRatingsAux(generalContractScope)
  updateUserRatingsAux(edenContractScope)
}

updateUserRatings()