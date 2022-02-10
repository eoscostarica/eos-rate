import { client } from '../../graphql'
import {
  GET_BLOCK_PRODUCERS,
  GET_PRODUCER_BY_OWNER,
  QUERY_RATING,
  MUTATION_UPDATE_RATING
} from '../../gql'
import getBpDataModeled from '../../utils/modeled-bp-data'
import { mainConfig } from '../../config'
import { getRpc } from '../../utils/eosjs-utils'

export const getProducers = async (limit, orderBy) => {
  const {
    data: { list, info }
  } = await client.query({
    variables: { limit, orderBy },
    query: GET_BLOCK_PRODUCERS,
    fetchPolicy: 'network-only'
  })

  if (!list.length) return { data: [], rows: 0 }

  const resultProducers = list.map(producer => {
    return getBpDataModeled({
      ...producer,
      edenRate: {
        average: producer?.eden_average || 0,
        ratings_cntr: producer?.eden_ratings_cntr || 0,
        community: producer?.eden_community || 0,
        development: producer?.eden_development || 0,
        infrastructure: producer?.eden_infrastructure || 0,
        transparency: producer?.eden_transparency || 0,
        trustiness: producer?.eden_trustiness || 0
      }
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

export const mutationInsertUserRating = async ({
  ual,
  user,
  bp,
  transaction,
  blockProducers,
  isEden
}) => {
  try {
    const {
      data: { rateProducer }
    } = await client.mutate({
      variables: {
        ratingInput: {
          producer: bp,
          isEden,
          user,
          transaction
        }
      },
      mutation: MUTATION_UPDATE_RATING
    })

    let producerUpdatedList = []
    let currentBP
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

    if (blockProducers.data.length) {
      producerUpdatedList = blockProducers?.data?.map(producer => {
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
      currentBP = producerUpdatedList.find(producer => producer.owner === bp)
      currentBP = {
        ...currentBP,
        edenRate: rateProducer.resultEden,
        total_average: rateProducer.total_average,
        total_community: rateProducer.total_community,
        total_development: rateProducer.total_development,
        total_infrastructure: rateProducer.total_infrastructure,
        total_ratings_cntr: rateProducer.total_ratings_cntr,
        total_transparency: rateProducer.total_transparency,
        total_trustiness: rateProducer.total_trustiness
      }
    } else {
      currentBP = await getProducer(bp)
    }

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

  const producerData = producer[0]

  return getBpDataModeled({
    ...producerData,
    edenRate: {
      average: producerData?.eden_average || 0,
      ratings_cntr: producerData?.eden_ratings_cntr || 0,
      community: producerData?.eden_community || 0,
      development: producerData?.eden_development || 0,
      infrastructure: producerData?.eden_infrastructure || 0,
      transparency: producerData?.eden_transparency || 0,
      trustiness: producerData?.eden_trustiness || 0
    }
  })
}
