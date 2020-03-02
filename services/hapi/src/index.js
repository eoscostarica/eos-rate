'use strict'
const { VIRTUAL_PORT, VIRTUAL_HOST } = process.env

const updateBpStats = require('./libs/sync-bp-stats')
const updateUserRatings = require('./libs/sync-user-rating')
const isValidAccountName = require('./libs/valid-account-name')

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
    handler: req => {
      const bp = req.payload.input.ratingInput.producer
      const isBp = isValidAccountName(bp)
      if (isBp) {
        updateBpStats(bp)
      }
      const user = req.payload.input.ratingInput.user
      const isUser = isValidAccountName(user)
      if (isUser) {
        updateUserRatings(user)
      }

      return {
        message:
          'updating stats for producer ' +
          bp +
          ' (' +
          isBp +
          ') and for user ' +
          user +
          ' (' +
          isUser +
          ')'
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
