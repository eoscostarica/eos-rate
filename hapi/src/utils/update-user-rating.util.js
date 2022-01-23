#!/usr/bin/env node
const { JsonRpc } = require('eosjs')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const { massiveDB } = require('../config')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.eosio.cr'
const HAPI_RATING_CONTRACT = process.env.HAPI_RATING_CONTRACT || 'rateproducer'

// gets data from blockchain
const getUserRatings = async isEden => {
  const eos = new JsonRpc(HAPI_EOS_API_ENDPOINT, { fetch })

  const ratings = await eos.get_table_rows({
    json: true,
    code: HAPI_RATING_CONTRACT,
    scope: isEden ? 'eden' : HAPI_RATING_CONTRACT,
    table: 'rating',
    limit: 1000,
    reverse: false,
    show_payer: false
  })
  return ratings
}

// updates the postgresdb
const updateUserRatings = async (
  userAccount,
  bpAccount,
  transaction,
  isEden
) => {
  console.log('==== Updating user ratings ====')

  try {
    const userRatings = await getUserRatings(isEden)

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

    const exist = await (
      await massiveDB
    ).user_ratings.findOne({
      user: blockProducer.user,
      bp: blockProducer.bp
    })

    if (exist) {
      const saveResult = await (
        await massiveDB
      ).user_ratings.save({
        id: exist.id,
        user: blockProducer.user,
        bp: blockProducer.bp,
        ratings: ratings,
        tx_data: transaction
      })

      if (!saveResult)
        throw new Error(
          `Could not save ${blockProducer.user}-${blockProducer.bp}`
        )
    } else {
      const insertResult = await (
        await massiveDB
      ).user_ratings.insert({
        user: blockProducer.user,
        bp: blockProducer.bp,
        ratings,
        tx_data: transaction
      })

      if (!insertResult)
        throw new Error(
          `Could not insert ${blockProducer.user}-${blockProducer.bp}`
        )
    }

    return {
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
