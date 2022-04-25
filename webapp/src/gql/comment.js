import { gql } from '@apollo/client'

export const GET_COMMENTS = gql`
  query getComments($bp: String) {
    comment(where: { bp: { _eq: $bp } }) {
      bp
      content
      user
      total_dislike
      total_like
      created_at
      transaction
      rating_id
      user_ratings {
        ratings
      }
    }
  }
`
