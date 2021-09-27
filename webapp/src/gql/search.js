import { gql } from '@apollo/client'

export const GET_ITEM_BY_NAME = gql`
  query getProducerAndProxies($name: String) {
    producers(where: { candidate_name: { _like: $name } }) {
      owner
      bpjson
    }
    proxies(where: { filter_name: { _like: $name } }) {
      name
      owner
    }
  }
`
