import gql from 'graphql-tag'

const MUTATION_DELETE_USER_RATE = gql`
  mutation MyMutation($user: String!, $bpName: String!) {
    delete_user_ratings(
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bpName } }] }
    ) {
      affected_rows
    }
  }
`

export default MUTATION_DELETE_USER_RATE
