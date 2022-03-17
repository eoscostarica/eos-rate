const { eosConfig } = require('../../../config')

module.exports = {
  type: 'rateproducer:logcomment',
  apply: async action => {
    try {
      console.log('ACTION', action)
      if (!action.data.proxy || action.data.proxy !== eosConfig.baseAccount) {
        return
      }
    } catch (error) {
      console.error(`error to sync ${action.action}: ${error.message}`)
    }
  }
}
