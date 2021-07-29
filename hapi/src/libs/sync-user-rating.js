#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = require('node-fetch')
const massive = require('massive')

const { massiveConfig } = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'

// gets data from blockchain
const getUserRatings = async () => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

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
const updateUserRatings = async (userAccount, bpAccount) => {
  console.log('\x1b[33m%s\x1b[0m', '==== updating user ratings ====')

  try {
    const db = await massive(massiveConfig)
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

    const result = await db.user_ratings.save({
      uniq_rating: blockProducer.uniq_rating,
      user: blockProducer.user,
      bp: blockProducer.bp,
      ratings: ratings
    })

    if (!result) {
      const insertResult = await db.user_ratings.insert({
        uniq_rating: blockProducer.uniq_rating,
        user: blockProducer.user,
        bp: blockProducer.bp,
        ratings
      })

      if (!insertResult)
        throw new Error(`could not save or insert ${blockProducer.uniq_rating}`)
    }

    return {
      uniq_rating: blockProducer.uniq_rating,
      user: blockProducer.user,
      bp: blockProducer.bp,
      ratings
    }
  } catch (error) {
    console.error('updateUserRatings', error)

    return error
  }
}

module.exports = updateUserRatings
