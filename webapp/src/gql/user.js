import { gql } from '@apollo/client'

export const GET_USER_RATING = gql`
  query getRates($user: String) {
    userRatings: user_ratings(
      where: { user: { _eq: $user } }
      order_by: { tx_data: asc }
    ) {
      bp
      ratings
      uniq_rating
      user
      tx_data
    }
  }
`
