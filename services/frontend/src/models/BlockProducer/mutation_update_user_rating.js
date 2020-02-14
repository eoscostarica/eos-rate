import gql from 'graphql-tag'

const MUTATION_UPDATE_USER_RATING = gql`
  mutation updateUserRating(
    $userRating: user_ratings_set_input
    $account: String
    $bp: String
  ) {
    update_user_ratings(
      _set: $userRating
      where: { _and: [{ account: { _eq: $account } }, { bp: { _eq: $bp } }] }
    ) {
      returning {
        account
        bp
        ratings
      }
    }
  }
`

export default MUTATION_UPDATE_USER_RATING
