const {
  eosConfig,
  generalContractScope,
  edenContractScope
} = require('../../../config')
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
        transaction_id,
        data: { rating_id: ratingId, comment }
      } = action
      const transaction = await eosApi.getTransaction(transaction_id)
      const transactionData = transaction.traces[1].act.data

      let userRatings
      userRatings = await eosApi.getTableRows({
        json: true,
        code: eosConfig.baseAccount,
        scope: 'eden',
        table: 'rating',
        reverse: false,
        limit: 1,
        lower_bound: ratingId,
        upper_bound: ratingId
      })

      if (!userRatings) {
        userRatings = await eosApi.getTableRows({
          json: true,
          code: eosConfig.baseAccount,
          scope: 'rateproducer',
          table: 'rating',
          reverse: false,
          limit: 1,
          lower_bound: ratingId,
          upper_bound: ratingId
        })
      }
      console.log('GENERAL', generalContractScope)
      console.log('EDEN', edenContractScope)
      console.log('USER RATING', userRatings)
      console.log('DATA TRANSACTION', transactionData)
      await save({
        user: transactionData.user,
        transaction: transaction_id,
        rating_id: ratingId,
        bp: transactionData.bp,
        content: comment
      })

      await updateUserRating({
        bp: blockProducer.bp,
        user: blockProducer.user,
        id_bc_rating: ratingId
      })
    } catch (error) {
      // console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
