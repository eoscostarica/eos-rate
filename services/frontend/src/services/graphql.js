import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL || 'http://localhost:8088/v1alpha1/graphql'
})

export default client
