import { gql } from '@apollo/client'

export const GET_COMMENTS = gql`
  query {
    comment() {
      bp
      comment
      total_like
      total_dislike
    }
  }
`
