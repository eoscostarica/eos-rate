import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Create an http link:
const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_HTTP_URL ||
    'http://localhost:8088/v1alpha1/graphql',
  credentials: 'same-origin'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri:
    process.env.REACT_APP_GRAPHQL_WS_URL ||
    'ws://localhost:8088/v1alpha1/graphql',
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
  cache: new InMemoryCache()
})

export default apolloClient
