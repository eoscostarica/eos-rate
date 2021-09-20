import gql from 'graphql-tag'

const QUERY_GET_PROXY_BY_OWNER = gql`
  query getProxiesByOwner($owner: String!) {
    proxies(where: { owner: { _eq: $owner } }) {
      background
      logo_256
      name
      owner
      philosophy
      slogan
      steemit
      telegram
      twitter
      voter_info
      website
      wechat
    }
  }
`

export default QUERY_GET_PROXY_BY_OWNER
