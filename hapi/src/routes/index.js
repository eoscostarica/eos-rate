const healthzRoute = require('./healthz.route')
const ratebpRoute = require('./ratebp.route')
const getRatesStats = require('./get-rates-stats.route')

module.exports = [healthzRoute, ratebpRoute, getRatesStats]
