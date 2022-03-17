const { eosConfig } = require('../../../config')
const { save } = require('../../comment.service')

module.exports = {
  type: 'sometestacco:logcomment',
  apply: async action => {
    try {
      console.log('LOG-COMMENT', action)
      const {
        actors,
        transaction_id,
        data: {
          data: { bp, comment }
        }
      } = action

      console.log('DATA', {
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
      if (!action.data.proxy || action.data.proxy !== eosConfig.baseAccount) {
        return
      }
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
