import gql from 'graphql-tag'

const QUERY_PRODUCER = gql`
  query getProducer($owner: String) {
    producers(where: { owner: { _eq: $owner } }) {
      bpjson
      owner
      system
    }
  }
`

export default QUERY_PRODUCER
