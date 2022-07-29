const { eosConfig } = require('../../../config')
const { saveOrUpdate } = require('../../comment_like.service')
const { updatelike } = require('../../comment.service')

module.exports = {
  type: `${eosConfig.baseAccount}:loglike`,
  apply: async action => {
    console.log(action)
    try {
      const {
        transaction_id,
        actors,
        data: { rating_id: ratingId, like }
      } = action

      await saveOrUpdate({
        user: actors.split('@')[0],
        rating_id: ratingId,
        transaction: transaction_id,
        like
      })

      await updatelike({
        rating_id: ratingId
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
