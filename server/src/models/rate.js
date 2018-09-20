const mongoose = require('mongoose')
const {composeWithMongoose} = require('graphql-compose-mongoose')
const {schemaComposer} = require('graphql-compose')

const RateSchema = new mongoose.Schema({
  rate: {
    type: Number
  }
})
const Rate = mongoose.model('Rate', RateSchema)

const customizationOptions = {}
const RateTC = composeWithMongoose(Rate, customizationOptions)

schemaComposer.Query.addFields({
  rateById: RateTC.getResolver('findById'),
  rateByIds: RateTC.getResolver('findByIds'),
  rateOne: RateTC.getResolver('findOne')
})

schemaComposer.Mutation.addFields({
  rateCreateOne: RateTC.getResolver('createOne')
})

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema
