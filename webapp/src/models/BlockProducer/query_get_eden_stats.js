import gql from 'graphql-tag'

const QUERY_EDEN_RATING = gql`
  query getEdenRating($bp: String) {
    eden_ratings_stats(where: { bp: { _eq: $bp } }) {
      bp
      average
      ratings_cntr
    }
  }
`

export default QUERY_EDEN_RATING
