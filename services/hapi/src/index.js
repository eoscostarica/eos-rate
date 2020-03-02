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
      var bp, user, message

      if (req.payload.input) {
        user = req.payload.input.ratingInput.user
        bp = req.payload.input.ratingInput.producer
        message = ''
      } else {
        message = 'Invalid Input'
        return { message }
      }

      const isBp = isValidAccountName(bp)
      if (isBp) {
        updateBpStats(bp)
        message += 'Updating BP -'
      } else {
        message += 'Invalid block producer provided! -'
      }

      const isUser = isValidAccountName(user)
      if (isUser) {
        updateUserRatings(user)
        message += 'Updating user '
      } else {
        message += ' Invalid user account provided!'
      }

      return { message }
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
