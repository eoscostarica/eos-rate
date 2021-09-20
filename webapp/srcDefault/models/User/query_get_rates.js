import gql from 'graphql-tag'

const QUERY_RATING = gql`
  query getRates($user: String) {
    user_ratings(where: { user: { _eq: $user } }, order_by: { tx_data: asc }) {
      bp
      ratings
      uniq_rating
      user
      tx_data
    }
  }
`

export default QUERY_RATING
