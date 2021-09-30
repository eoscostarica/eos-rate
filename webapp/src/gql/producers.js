import { gql } from '@apollo/client'

export const GET_BLOCK_PRODUCERS = gql`
  query blockProducers($limit: Int = 15, $orderBy: [producers_list_order_by!]) {
    info: producers_list_aggregate(
      where: { system: { _contains: { is_active: 1 } } }
    ) {
      producers: aggregate {
        count
      }
    }
    list: producers_list(
      where: { system: { _contains: { is_active: 1 } } }
      limit: $limit
      order_by: $orderBy
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

export const GET_PRODUCER_BY_PRODUCER_LIST = gql`
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

export const GET_EDEN_RATING = gql`
  query getEdenRating($bp: String) {
    edenRatingsStats: eden_ratings_stats(where: { bp: { _eq: $bp } }) {
      bp
      average
      ratings_cntr
      infrastructure
      transparency
      trustiness
      development
      community
    }
  }
`
