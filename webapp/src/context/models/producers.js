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

  if (!list.length) return []

  const resultProducers = list.map(producer => {
    return getBpDataModeled({
      ...producer,
      edenRate: {
        average: producer.eden_average,
        ratings_cntr: producer.eden_ratings_cntr,
        community: producer.eden_community,
        development: producer.eden_development,
        infrastructure: producer.eden_infrastructure,
        transparency: producer.eden_transparency,
        trustiness: producer.eden_trustiness
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
          isEden: state?.user?.userData?.edenMember,
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

const calculateTotalStats = ({
  firstAverage,
  secondAverage,
  fieldsAmount,
  firstCounter,
  secondCounter
}) => {
  const dividend =
    firstAverage * (firstCounter * fieldsAmount) +
    secondAverage * (secondCounter * fieldsAmount)
  const divider = (firstCounter + secondCounter) * fieldsAmount
  return dividend / divider
}

export const getTotalStats = ({
  producerData,
  edenStats,
  statsAmount,
  oneStat
}) => {
  const average = calculateTotalStats({
    firstAverage: producerData.average,
    secondAverage: edenStats.average,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: statsAmount
  })

  const community = calculateTotalStats({
    firstAverage: producerData.community,
    secondAverage: edenStats.community,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: oneStat
  })

  const development = calculateTotalStats({
    firstAverage: producerData.development,
    secondAverage: edenStats.development,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: oneStat
  })

  const infrastructure = calculateTotalStats({
    firstAverage: producerData.infrastructure,
    secondAverage: edenStats.infrastructure,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: oneStat
  })

  const trustiness = calculateTotalStats({
    firstAverage: producerData.trustiness,
    secondAverage: edenStats.trustiness,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: oneStat
  })

  const transparency = calculateTotalStats({
    firstAverage: producerData.trustiness,
    secondAverage: edenStats.trustiness,
    firstCounter: producerData.ratings_cntr,
    secondCounter: edenStats.ratings_cntr,
    fieldsAmount: oneStat
  })

  return {
    average,
    ratings_cntr: producerData.ratings_cntr + edenStats.ratings_cntr,
    community,
    development,
    infrastructure,
    trustiness,
    transparency
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
      average: producerData.eden_average,
      ratings_cntr: producerData.eden_ratings_cntr,
      community: producerData.eden_community,
      development: producerData.eden_development,
      infrastructure: producerData.eden_infrastructure,
      transparency: producerData.eden_transparency,
      trustiness: producerData.eden_trustiness
    }
  })
}
