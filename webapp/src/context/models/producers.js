import { client } from '../../graphql'
import {
  GET_BLOCK_PRODUCERS,
  GET_EDEN_RATING,
  GET_PRODUCER_BY_OWNER
} from '../../gql'
import getBpDataModeled from '../../utils/modeled-bp-data'

export const getProducers = async limit => {
  const {
    data: { list, info }
  } = await client.query({
    variables: { limit },
    query: GET_BLOCK_PRODUCERS,
    fetchPolicy: 'network-only'
  })

  const promiseResolved = await Promise.all(
    list.map(({ owner }) => {
      return client.query({
        variables: {
          bp: owner
        },
        query: GET_EDEN_RATING,
        fetchPolicy: 'network-only'
      })
    })
  )

  const resultProducers = list.map((producer, index) => {
    const edenRate = promiseResolved[index].data.edenRatingsStats[0] || {}

    return getBpDataModeled({
      ...producer,
      edenRate
    })
  })

  return { data: resultProducers, rows: info.producers.count }
}

export const getProducer = async owner => {
  const {
    data: { producer }
  } = await client.query({
    variables: { account: owner },
    query: GET_PRODUCER_BY_OWNER,
    fetchPolicy: 'network-only'
  })

  if (!producer.length) return null

  const {
    data: { edenRatingsStats }
  } = await client.query({
    variables: {
      bp: owner
    },
    query: GET_EDEN_RATING,
    fetchPolicy: 'network-only'
  })

  return getBpDataModeled({
    ...producer[0],
    edenRate: edenRatingsStats.length ? { ...edenRatingsStats[0] } : {}
  })
}
