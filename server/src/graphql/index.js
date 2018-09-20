const {print} = require('graphql/language')
const {makeExecutableSchema} = require('graphql-tools')
const {merge} = require('lodash')

const {combineASTSchemas} = require('./merge-graphql')

const root = require('./root.graphql')

const RatingSchema = require('./Rating/Rating.graphql')
const RatingResolvers = require('./Rating/Rating.resolvers')

let Schemas = print(combineASTSchemas([
  root,
  RatingSchema
]))

const Resolvers = merge(
  RatingResolvers
)

console.log('Require to update graph 0...')

const executableSchema = makeExecutableSchema({
  typeDefs: Schemas,
  resolvers: Resolvers
})

module.exports = executableSchema
