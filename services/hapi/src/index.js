'use strict'
const { VIRTUAL_PORT, VIRTUAL_HOST } = process.env

const updateBpStats = require('./libs/sync-bp-stats')
const updateUserRatings = require('./libs/sync-user-rating')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: VIRTUAL_PORT || 3005,
    host: VIRTUAL_HOST || '0.0.0.0'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function() {
      return '<h2>EOS Rate HTTP API service</h2>'
    }
  })

  server.route({
    method: 'POST',
    path: '/ratebp',
    handler: (req, resp) => {
      const bp = req.payload.producer
      if (bp) {
        updateBpStats(bp)
      }
      const user = req.payload.user
      if (user) {
        updateUserRatings(user)
      }

      return {
        response: resp.payload,
        message: 'updating stats for producer: ' + bp + ' user : ' + user
      }
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
