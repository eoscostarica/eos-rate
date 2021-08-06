import gql from 'graphql-tag'

const MUTATION_UPDATE_RATING = gql`
  mutation updateRating($ratingInput: RatingInput!) {
    rateProducer(ratingInput: $ratingInput) {
      message
      uniq_rating
      user
      bp
      ratings
    }
  }
`

export default MUTATION_UPDATE_RATING
