import { client } from '../../graphql'
import {
  GET_BLOCK_PRODUCERS,
  GET_EDEN_RATING,
  GET_PRODUCER_BY_OWNER,
  QUERY_RATING,
  MUTATION_UPDATE_RATING
} from '../../gql'
import getBpDataModeled from '../../utils/modeled-bp-data'
import { mainConfig } from '../../config'
import { getRpc } from '../../utils/eosjs-utils'

export const getProducers = async limit => {
  const {
    data: { list, info }
  } = await client.query({
    variables: { limit },
    query: GET_BLOCK_PRODUCERS,
    fetchPolicy: 'network-only'
  })

  if (!list.length) return []

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

export const getBlockProducerRatingByOwner = async (
  { bp, userAccount },
  state
) => {
  try {
    const {
      data: { user_ratings: userRatings }
    } = await client.query({
      variables: { bp, user: userAccount },
      query: QUERY_RATING
    })

    return userRatings.length ? userRatings[0].ratings : null
  } catch (error) {
    console.error('getBlockProducerRatingByOwner', error)
  }
}

export const mutationInsertUserRating = async (
  { ual, user, bp, result, transaction, blockProducers, ...ratings },
  state
) => {
  try {
    const {
      data: { rateProducer }
    } = await client.mutate({
      variables: {
        ratingInput: {
          producer: bp,
          user,
          transaction: transaction
        }
      },
      mutation: MUTATION_UPDATE_RATING
    })

    const rpc = getRpc(ual)

    const { rows: rateStat } = await rpc.get_table_rows({
      json: true,
      code: mainConfig.contract,
      scope: mainConfig.contract,
      table: 'stats',
      lower_bound: bp,
      limit: 1,
      reverse: false,
      show_payer: false
    })

    const producerUpdatedList = blockProducers.data.map(producer => {
      if (rateStat.length && producer.owner === rateStat[0].bp) {
        const parameters = {
          community: rateStat[0].community,
          development: rateStat[0].development,
          infrastructure: rateStat[0].infrastructure,
          transparency: rateStat[0].transparency,
          trustiness: rateStat[0].trustiness
        }
        const graphData = Object.values(parameters)

        return {
          ...producer,
          average: rateStat[0].average,
          ratings_cntr: rateStat[0].ratings_cntr,
          system: {
            ...producer.system,
            parameters
          },
          data: {
            ...producer.data,
            data: graphData
          }
        }
      }

      return producer
    })
    let currentBP = producerUpdatedList.find(producer => producer.owner === bp)
    currentBP = { ...currentBP, ...rateProducer.resultEden }
    const userRate = await getBlockProducerRatingByOwner({
      bp,
      userAccount: user
    })

    return {
      currentBP,
      producerUpdatedList,
      rateProducer,
      userRate
    }
  } catch (error) {
    console.error('mutationInsertUserRating', error)
  }
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
