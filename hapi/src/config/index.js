const massive = require('massive')

const massiveConfig = require('./server.config')
const massiveDB = (async () => await massive(massiveConfig))()
const CONTRACT_SCOPES = [process.env.HAPI_RATING_CONTRACT, "genesis.eden"]

module.exports = {
    massiveConfig,
    massiveDB,
    CONTRACT_SCOPES
}