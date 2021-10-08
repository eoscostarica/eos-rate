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

export const MUTATION_INSERT_USER_RATING = gql`
  mutation saveUserRating($objects: [user_ratings_insert_input!]!) {
    insert_user_ratings(objects: $objects) {
      returning {
        user
        bp
        ratings
      }
    }
  }
`

export const MUTATION_UPDATE_RATING = gql`
  mutation updateRating($ratingInput: RatingInput!) {
    rateProducer(ratingInput: $ratingInput) {
      message
      resultEden
      user
      bp
      ratings
    }
  }
`

export const MUTATION_UPDATE_USER_RATING = gql`
  mutation updateUserRating(
    $userRating: user_ratings_set_input
    $user: String
    $bp: String
  ) {
    update_user_ratings(
      _set: $userRating
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bp } }] }
    ) {
      returning {
        user
        bp
        ratings
      }
    }
  }
`

export const QUERY_RATING = gql`
  query getRating($user: String, $bp: String) {
    user_ratings(
      where: { _and: [{ user: { _eq: $user } }, { bp: { _eq: $bp } }] }
    ) {
      user
      bp
      ratings
      tx_data
    }
  }
`

export const QUERY_EDEN_RATING = gql`
  query getEdenRating($bp: String) {
    eden_ratings_stats(where: { bp: { _eq: $bp } }) {
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

export const QUERY_PRODUCER = gql`
  query getProducer($owner: String) {
    producers(where: { owner: { _eq: $owner } }) {
      bpjson
      owner
      system
    }
  }
`
