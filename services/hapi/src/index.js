'use strict'

const updateBpStats = require('./libs/sync-bp-stats')
const updateUserRatings = require('./libs/sync-user-rating')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3005,
    host: '0.0.0.0'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function() {
      return '<h2>EOS Rate HTTP API service</h2>'
    }
  })

  server.route({
    method: 'GET',
    path: '/ratebp',
    handler: request => {
      const bp = request.query.producer
      if (bp) {
        updateBpStats(bp)
      }

      const user = request.query.user
      if (user) {
        updateUserRatings(user)
      }

      return 'updating stats for producer: ' + bp + ' user : ' + user
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
