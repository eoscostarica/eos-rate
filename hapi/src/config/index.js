const massive = require('massive')

const massiveConfig = require('./server.config')
const chainConfig = require('./chain.config')
const hyperionConfig = require('./hyperion.config')
const hasuraConfig = require('./hasura.config')
const eosConfig = require('./eos.config')

const massiveDB = (async () => {
  try {
    return await massive(massiveConfig)
  } catch (err) {
    console.log('---- Failed to connect to database ----')
    console.log(err)

    return null
  }
})()

module.exports = {
  massiveConfig,
  massiveDB,
  generalContractScope: process.env.HAPI_RATING_CONTRACT || 'rateproducer',
<<<<<<< HEAD
  edenContractScope: 'eden',
  chainConfig,
  hyperionConfig,
  hasuraConfig,
  eosConfig
=======
  edenContractScope: 'eden'
>>>>>>> staging
}
