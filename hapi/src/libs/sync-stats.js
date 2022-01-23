#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const {
  generalContractScope,
  edenContractScope,
  massiveDB
} = require('../config')
const { getTotalStats } = require('../utils')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getRatingsStats = async scope => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

  try {
    const ratings = await eos.get_table_rows({
      json: true,
      code: HAPI_RATING_CONTRACT,
      scope: scope,
      table: 'stats',
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

const updateRatingsStats = async () => {
  console.log('==== Updating ratings stats ====')
  let totalRatings = []
  const generalRatingsStats = await getRatingsStats(generalContractScope)
  const edenRatingsStats = await getRatingsStats(edenContractScope)

  generalRatingsStats.rows.forEach(async rating => {
    try {
      const resultRatingStatsSave = await (
        await massiveDB
      ).ratings_stats.save(rating)
      const dbResult =
        resultRatingStatsSave ||
        (await (await massiveDB).ratings_stats.insert(rating))
      console.log(
        `General save or insert of ${rating.bp} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  })

  generalRatingsStats.rows.forEach(rating => {
    let haveTwoRating = false
    for (let index = 0; index < edenRatingsStats.rows.length; index++) {
      if (rating.bp === edenRatingsStats.rows[index].bp) {
        haveTwoRating = true
        totalRatings = [
          ...totalRatings,
          {
            ...getTotalStats({
              producerData: rating,
              edenStats: edenRatingsStats.rows[index],
              statsAmount: 5,
              oneStat: 1
            }),
            bp: rating.bp
          }
        ]
        break
      }
    }

    if (!haveTwoRating) {
      totalRatings = [
        ...totalRatings,
        {
          ...getTotalStats({
            producerData: rating,
            edenStats: {},
            statsAmount: 5,
            oneStat: 1
          }),
          bp: rating.bp
        }
      ]
    }
  })

  edenRatingsStats.rows.forEach(async rating => {
    try {
      const resultRatingStatsSave = await (
        await massiveDB
      ).eden_ratings_stats.save(rating)
      const dbResult =
        resultRatingStatsSave ||
        (await (await massiveDB).eden_ratings_stats.insert(rating))
      console.log(
        `Eden save or insert of ${rating.bp} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  })

  edenRatingsStats.rows.forEach(rating => {
    let haveTwoRating = false
    for (let index = 0; index < generalRatingsStats.rows.length; index++) {
      if (rating.bp === generalRatingsStats.rows[index].bp) {
        haveTwoRating = true
        break
      }
    }

    if (!haveTwoRating) {
      totalRatings = [
        ...totalRatings,
        {
          ...getTotalStats({
            producerData: {},
            edenStats: rating,
            statsAmount: 5,
            oneStat: 1
          }),
          bp: rating.bp
        }
      ]
    }
  })

  totalRatings.forEach(async rating => {
    try {
      const resultRatingStatsSave = await (
        await massiveDB
      ).total_ratings_stats.save(rating)
      const dbResult =
        resultRatingStatsSave ||
        (await (await massiveDB).total_ratings_stats.insert(rating))
      console.log(
        `Total rating save or insert of ${rating.bp} was ${
          dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'
        }`
      )
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  })
}

updateRatingsStats()
