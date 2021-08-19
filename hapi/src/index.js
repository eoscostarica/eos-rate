'use strict'
const { HAPI_SERVER_PORT, HAPI_SERVER_ADDRESS } = process.env

const updateBpStats = require('./libs/sync-bp-stats')
const updateUserRatings = require('./libs/sync-user-rating')
const accountValidation = require('./libs/valid-account-name')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: HAPI_SERVER_PORT,
    host: HAPI_SERVER_ADDRESS
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

        const resultEden = await updateBpStats(producer)
        const result = await updateUserRatings(user, producer)

        return { resultEden: resultEden, ...result }
      } catch (error) {
        console.error('ratebp', error)

        return error
      }
    }
  })

  await server.start()
  console.log(`🚀 Server ready at ${server.info.uri}`)
  server.table().forEach(route => console.log(`${route.method}\t${route.path}`))
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
