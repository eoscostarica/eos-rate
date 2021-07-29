import gql from 'graphql-tag'

const MUTATION_INSERT_USER_RATING = gql`
  mutation saveUserRating($objects: [user_ratings_insert_input!]!) {
    insert_user_ratings(objects: $objects) {
      returning {
        user
        bp
        ratings
      }
    }
  }
`

export default MUTATION_INSERT_USER_RATING
