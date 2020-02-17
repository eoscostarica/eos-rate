import gql from 'graphql-tag'

const QUERY_RATING = gql`
  query getRating($account: String, $bp: String) {
    user_ratings(
      where: { _and: [{ account: { _eq: $account } }, { bp: { _eq: $bp } }] }
    ) {
      account
      bp
      ratings
      tx_data
    }
  }
`

export default QUERY_RATING
