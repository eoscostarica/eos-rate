const massive = require('massive')

const massiveConfig = require('./server.config')
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
  edenContractScope: 'eden'
}
