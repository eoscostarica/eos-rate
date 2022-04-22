const { eosConfig } = require('../../../config')
const { saveOrUpdate } = require('../../comment_like.service')
const { updatelike } = require('../../comment.service')

module.exports = {
  type: `${eosConfig.baseAccount}:loglike`,
  apply: async action => {
    try {
      const {
        transaction_id,
        actors,
        data: {
          data: { rating_id, like }
        }
      } = action

      await saveOrUpdate({
        user: actors.split('@')[0],
        rating_id,
        transaction: transaction_id,
        like
      })

      await updatelike({
        rating_id
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
