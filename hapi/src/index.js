'use strict'
const { HAPI_SERVER_PORT, HAPI_SERVER_ADDRESS } = process.env

const Hapi = require('@hapi/hapi')

const routes = require('./routes')
const { workerService } = require('./services')

const init = async () => {
  const server = Hapi.server({
    port: HAPI_SERVER_PORT,
    host: HAPI_SERVER_ADDRESS,
    routes: {
      cors: { origin: ['*'] }
    },
    debug: { request: ['handler'] }
  })

  server.route(routes)

  await server.start()
  console.log(`🚀 Server ready at ${server.info.uri}`)
  server.table().forEach(route => console.log(`${route.method}\t${route.path}`))
  workerService.init()
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
