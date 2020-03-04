import gql from 'graphql-tag'

const QUERY_RATING = gql`
  query getRating($user: String, $bp: String) {
    user_ratings(
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bp } }] }
    ) {
      user
      bp
      ratings
      tx_data
    }
  }
`

export default QUERY_RATING
