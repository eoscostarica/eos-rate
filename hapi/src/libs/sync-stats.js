#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const {
  defaultContractScope,
  edenContractScope,
  massiveDB
} = require('../config')

const HAPI_EOS_API_ENDPOINT = process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

const getRatingsStats = async (scope) => {
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
  const defaultRatingsStats = await getRatingsStats(defaultContractScope)
  const edenRatingsStats = await getRatingsStats(edenContractScope)

  defaultRatingsStats.rows.forEach(async (rating) => {
    try {
      const resultRatingStatsSave = await (await massiveDB).ratings_stats.save(rating)
      const dbResult = resultRatingStatsSave ? resultRatingStatsSave : await (await massiveDB).ratings_stats.insert(rating)
      console.log(`Default save or insert of ${rating.bp} was ${dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'}`)
    } catch (err) { console.log(`Error: ${err}`) }
  })

  edenRatingsStats.rows.forEach(async (rating) => {
    try {
      const resultRatingStatsSave = await (await massiveDB).eden_ratings_stats.save(rating)
      const dbResult = resultRatingStatsSave ? resultRatingStatsSave : await (await massiveDB).eden_ratings_stats.insert(rating)
      console.log(`Eden save or insert of ${rating.bp} was ${dbResult ? 'SUCCESSFULL' : 'UNSUCCESSFULL'}`)
    } catch (err) { console.log(`Error: ${err}`) }
  })
}

updateRatingsStats()
