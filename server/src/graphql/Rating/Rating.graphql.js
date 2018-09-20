module.exports = `
type Rating {
  id: String
}

type BlockProducer {
  id: String
}

type Query {
  ratings: [Rating]
  blockProducers: [BlockProducer]
}

type Mutation {
  changeRatings: [Rating]
}`
