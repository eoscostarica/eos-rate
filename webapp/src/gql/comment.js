import { gql } from '@apollo/client'

export const GET_COMMENTS = gql`
  query {
    comment {
      bp
      content
      user
      total_dislike
      total_like
      created_at
      transaction
    }
  }
`
