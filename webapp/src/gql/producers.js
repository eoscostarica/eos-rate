import { gql } from '@apollo/client'

export const GET_BLOCK_PRODUCERS = gql`
  query blockProducers {
    info: producers_list_aggregate(
      where: { system: { _contains: { is_active: 1 } } }
    ) {
      producers: aggregate {
        count
      }
    }
    list: producers_list(
      where: { system: { _contains: { is_active: 1 } } }
      limit: 15
      order_by: [{ bpjson: desc }, { total_votes: desc }]
    ) {
      owner
      system
      bpjson
      average
      community
      development
      infrastructure
      trustiness
      transparency
      ratings_cntr
      general_info
      eden_average
      eden_ratings_cntr
    }
  }
`

export const GET_PRODUCER_BY_OWNER = gql`
  query blockProducers($account: String) {
    producer: producers_list(
      where: {
        _and: [
          { system: { _contains: { is_active: 1 } } }
          { owner: { _eq: $account } }
        ]
      }
    ) {
      owner
      system
      bpjson
      average
      community
      development
      infrastructure
      trustiness
      transparency
      ratings_cntr
      general_info
      eden_average
      eden_ratings_cntr
    }
  }
`

export const GET_PRODUCER_BY_PROXY = gql`
  query getProducerList($producerList: [String!]) {
    producerList: producers_list(where: { owner: { _in: $producerList } }) {
      owner
      system
      bpjson
      average
      community
      development
      infrastructure
      trustiness
      transparency
      ratings_cntr
      general_info
      eden_average
      eden_ratings_cntr
    }
  }
`
