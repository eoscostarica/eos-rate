const { eosConfig } = require('../../../config')
const { save } = require('../../comment.service')

module.exports = {
  type: `${eosConfig.baseAccount}:logcomment`,
  apply: async action => {
    try {
      const {
        actors,
        transaction_id,
        data: { bp, comment }
      } = action

      console.log('LOG COMMENT', {
        user: actors.split('@')[0],
        transaction: transaction_id,
        bp,
        content: comment
      })
      await save({
        user: actors.split('@')[0],
        transaction: transaction_id,
        bp,
        content: comment
      })
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
