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
          data: { transaction: comment_transaction, like }
        }
      } = action

      await saveOrUpdate({
        user: actors.split('@')[0],
        transaction: transaction_id,
        comment_transaction,
        like
      })

      await updatelike({
        comment_transaction
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}