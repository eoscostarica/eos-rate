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
      let bp, user
      if (req.payload.input.ratingInput) {
        bp = req.payload.input.ratingInput.producer
      } else {
        bp = ''
      }
      console.log('bp', bp)
      const isBp = isValidAccountName(bp)
      console.log('isbp', isBp)
      if (isBp) {
        updateBpStats(bp)
      }

      if (req.payload.input.ratingInput) {
        user = req.payload.input.ratingInput.user
      } else {
        user = ''
      }
      console.log('user', user)
      const isUser = isValidAccountName(user)
      console.log('isUser', isUser)
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
