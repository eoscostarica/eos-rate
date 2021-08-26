const massive = require('massive')

const massiveConfig = require('./server.config')
const massiveDB = (async () => await massive(massiveConfig))()

module.exports = {
    massiveConfig,
    massiveDB,
    generalContractScope: process.env.HAPI_RATING_CONTRACT || 'rateproducer',
    edenContractScope: 'eden'
}