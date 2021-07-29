import gql from 'graphql-tag'

const MUTATION_UPDATE_USER_RATING = gql`
  mutation updateUserRating(
    $userRating: user_ratings_set_input
    $user: String
    $bp: String
  ) {
    update_user_ratings(
      _set: $userRating
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bp } }] }
    ) {
      returning {
        user
        bp
        ratings
        uniq_rating
      }
    }
  }
`

export default MUTATION_UPDATE_USER_RATING
