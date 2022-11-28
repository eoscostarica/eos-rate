'use strict'
const { HAPI_SERVER_PORT, HAPI_SERVER_ADDRESS, HAPI_VALID_USERS } = process.env

const Hapi = require('@hapi/hapi')
const Bcrypt = require('bcrypt')

const routes = require('./routes')
const { workerService } = require('./services')

const validate = async (request, username, password) => {
  if (!HAPI_VALID_USERS) return { credentials: null, isValid: false }

  const users = JSON.parse(HAPI_VALID_USERS || '[]')
  const user = users.find(user => user.username === username)

  if (!user) {
    return { credentials: null, isValid: false }
  }

  const saltRounds = 10
  const hashPassword = await Bcrypt.hash(user.password, saltRounds)
  const isValid = await Bcrypt.compare(password, hashPassword)
  const credentials = { id: users.indexOf(user), name: user.username }

  return { isValid, credentials }
}

const init = async () => {
  const server = Hapi.server({
    port: HAPI_SERVER_PORT,
    host: HAPI_SERVER_ADDRESS,
    routes: {
      cors: { origin: ['*'] }
    },
    debug: { request: ['handler'] }
  })

  await server.register(require('@hapi/basic'))

  server.auth.strategy('simple', 'basic', { validate })

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
