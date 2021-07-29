import gql from 'graphql-tag'

const QUERY_RATING = gql`
  query getRates($user: String) {
    user_ratings(where: { user: { _eq: $user } }) {
      bp
      ratings
      uniq_rating
      user
    }
  }
`

export default QUERY_RATING
