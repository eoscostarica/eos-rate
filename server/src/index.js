const fastify = require('fastify')
// import { graphiqlFastify, graphqlFastify } from 'fastify-graphql'
const humanToCron = require('human-to-cron')
const schedule = require('node-schedule')
const eosCamelApi = require('@eoscostarica/eosjs-camel-api')

const eosApi = eosCamelApi.getInstance()

const syncProducers = async () => {
  try {
    const info = await eosApi.getProducers({})
    console.log('===========================')
    console.log(`Got producers`)
    console.log(info)
  } catch (err) {
    console.log(err)
  }
}

const timeInterval = humanToCron('once each second')
const SyncProducersJob = schedule.scheduleJob(timeInterval, syncProducers)

const app = fastify()

// app.register(graphqlFastify, {
//   prefix: "/graphql",
//   graphql: {
//     schema: your_graphql_schema
//   }
// });
// app.register(graphiqlFastify, {
//   prefix: "/graphiql",
//   graphiql: {
//     endpointURL: "/graphql"
//   }
// });
