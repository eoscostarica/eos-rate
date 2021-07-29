import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

const REACT_APP_GRAPHQL_HTTP_URL = process.env.REACT_APP_GRAPHQL_HTTP_URL
console.log(`REACT_APP_GRAPHQL_HTTP_URL: ${REACT_APP_GRAPHQL_HTTP_URL}`)

// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URL,
  credentials: 'same-origin'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_URL,
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Instantiate client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
})

export default apolloClient
