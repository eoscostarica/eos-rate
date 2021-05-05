'use strict'
const { VIRTUAL_PORT, VIRTUAL_HOST } = process.env

const updateBpStats = require('./libs/sync-bp-stats')
const updateUserRatings = require('./libs/sync-user-rating')
const accountValidation = require('./libs/valid-account-name')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: VIRTUAL_PORT,
    host: VIRTUAL_HOST
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
    handler: async req => {
      try {
        const {
          payload: { input }
        } = req

        if (!input) throw new Error('Invalid ratebp Input')

        const {
          ratingInput: { user, producer }
        } = input
        const isValidAccountName = accountValidation([
          { name: user, type: 'user account' },
          { name: producer, type: 'block producer' }
        ])

        if (!isValidAccountName.isValidAccountName)
          throw new Error(isValidAccountName.message)

        updateBpStats(producer)
        const result = await updateUserRatings(user, producer)

        return { message: 'rate block producer was successfully!', ...result }
      } catch (error) {
        console.error('ratebp', error)

        return error
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
