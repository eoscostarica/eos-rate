const { eosConfig } = require('../../../config')
const { save, updateUserRating } = require('../../comment.service')
const EosApi = require('eosjs-api')

const HAPI_EOS_API_ENDPOINT =
  process.env.HAPI_EOS_API_ENDPOINT || 'https://jungle.edenia.cloud'

const eosApi = EosApi({
  httpEndpoint: HAPI_EOS_API_ENDPOINT,
  verbose: false,
  fetchConfiguration: {}
})

module.exports = {
  type: `${eosConfig.baseAccount}:logcomment`,
  apply: async action => {
    try {
      const {
        actors,
        transaction_id,
        data: {
          data: { rating_id, comment }
        }
      } = action
      let userRatings

      userRatings = await eosApi.getTableRows({
        json: true,
        code: eosConfig.baseAccount,
        scope: 'eden',
        table: 'rating',
        reverse: false,
        limit: 1,
        lower_bound: rating_id,
        upper_bound: rating_id
      })

      if (!userRatings) {
        userRatings = await eosApi.getTableRows({
          json: true,
          code: eosConfig.baseAccount,
          scope: 'rateproducer',
          table: 'rating',
          reverse: false,
          limit: 1,
          lower_bound: rating_id,
          upper_bound: rating_id
        })
      }

      const [blockProducer] = userRatings.rows.filter(
        ({ id }) => id == rating_id
      )

      await save({
        user: blockProducer.user,
        transaction: transaction_id,
        rating_id,
        bp: blockProducer.bp,
        content: comment
      })

      await updateUserRating({
        bp: blockProducer.bp,
        user: blockProducer.user,
        id_bc_rating: rating_id
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
