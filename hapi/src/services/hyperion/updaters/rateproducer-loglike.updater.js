const { eosConfig } = require('../../../config')

module.exports = {
  type: 'rateproducer:voteproducer',
  apply: async action => {
    try {
      if (!action.data.proxy || action.data.proxy !== eosConfig.baseAccount) {
        return
      }

      console.log('ACTION', action)
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
