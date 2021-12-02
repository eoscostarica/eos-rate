'use strict'
const { HAPI_SERVER_PORT, HAPI_SERVER_ADDRESS } = process.env

const {
  updateBpStatsUtil,
  updateUserRatingUtil,
  validateAccountNameUtil
} = require('./utils/')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: HAPI_SERVER_PORT,
    host: HAPI_SERVER_ADDRESS
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function () {
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
          ratingInput: { user, producer, transaction, isEden }
        } = input
        const isValidAccountName = validateAccountNameUtil([
          { name: user, type: 'user account' },
          { name: producer, type: 'block producer' }
        ])

        if (!isValidAccountName.isValidAccountName)
          throw new Error(isValidAccountName.message)

        const { edenResult, totalStats } = await updateBpStatsUtil(producer)
        const result = await updateUserRatingUtil(
          user,
          producer,
          transaction,
          isEden
        )
        console.log({ result })
        return { resultEden: edenResult, totalStats, ...result }
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
