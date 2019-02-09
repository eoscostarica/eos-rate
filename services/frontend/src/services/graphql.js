import ApolloClient from 'apollo-boost'

console.log(process.env)
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8088/v1alpha1/graphql'
})

export default client
