import { gql } from '@apollo/client'

export const GET_PROXIES = gql`
  query proxies($limit: Int = 15) {
    info: proxies_aggregate {
      proxies: aggregate {
        count
      }
    }
    proxies(limit: $limit) {
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

export const GET_PROXY_BY_OWNER = gql`
  query proxy($account: String) {
    proxy: proxies(where: { owner: { _eq: $account } }) {
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
