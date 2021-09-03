#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')

const { massiveDB } = require('../config')

const HAPI_EOS_API_ENDPOINT = process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

// gets data from blockchain
const getUserRatings = async () => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

  let ratings = await eos.get_table_rows({
    json: true,
    code: HAPI_RATING_CONTRACT,
    scope: HAPI_RATING_CONTRACT,
    table: 'ratings',
    limit: 1000,
    reverse: false,
    show_payer: false
  })
  return ratings
}

// updates the postgresdb
const updateUserRatings = async (userAccount, bpAccount, transaction) => {
  console.log('==== Updating user ratings ====')

  try {
    const userRatings = await getUserRatings()

    if (!userAccount || !bpAccount)
      throw new Error('User Account and Block Producer owner are required!')

    const [blockProducer] = userRatings.rows.filter(
      ({ user, bp }) => user == userAccount && bp === bpAccount
    )

    if (!blockProducer) throw new Error('Block Producer rate not found')

    const ratings = {
      transparency: blockProducer.transparency || 0,
      infrastructure: blockProducer.infrastructure || 0,
      trustiness: blockProducer.trustiness || 0,
      development: blockProducer.development || 0,
      community: blockProducer.community || 0
    }

    const result = await (await massiveDB).user_ratings.save({
      uniq_rating: blockProducer.uniq_rating,
      user: blockProducer.user,
      bp: blockProducer.bp,
      ratings: ratings,
      tx_data: transaction
    })

    if (!result) {
      const insertResult = await (await massiveDB).user_ratings.insert({
        uniq_rating: blockProducer.uniq_rating,
        user: blockProducer.user,
        bp: blockProducer.bp,
        ratings,
        tx_data: transaction
      })

      if (!insertResult)
        throw new Error(`Could not save or insert ${blockProducer.uniq_rating}`)
    }

    return {
      uniq_rating: blockProducer.uniq_rating,
      user: blockProducer.user,
      bp: blockProducer.bp,
      ratings,
      message: 'Block producer rated successfully!'
    }
  } catch (error) {
    console.error('updateUserRatings', error)

    return error
  }
}

module.exports = updateUserRatings
