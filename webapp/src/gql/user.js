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

export const DELETE_USER_RATE = gql`
  mutation deleteUserRate($user: String!, $bpName: String!) {
    delete_user_ratings(
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bpName } }] }
    ) {
      affected_rows
    }
  }
`
