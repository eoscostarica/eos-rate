import gql from 'graphql-tag'

const QUERY_GET_PROXIES = gql`
  query getProxies {
    proxies {
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

export default QUERY_GET_PROXIES
