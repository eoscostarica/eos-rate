import _get from 'lodash.get'

import { client } from '../../graphql'
import {
  GET_PROXIES,
  GET_PRODUCER_BY_PRODUCER_LIST,
  GET_PROXY_BY_OWNER
} from '../../gql'
import calculateEosFromVotes from '../../utils/convert-votes-to-eos-votes'
import getBPRadarData from '../../utils/get-bp-radar-data'
import getBpDataModeled from '../../utils/modeled-bp-data'

const getResultModeled = (proxies, promiseResolved) =>
  proxies.map((proxy, index) => {
    const producers = promiseResolved[index].data.producerList
    const rateInfo = []
    const proxiedVoteEOS = calculateEosFromVotes(
      _get(proxy, 'voter_info.last_vote_weight', 0)
    )
    const totalVoteEOS = calculateEosFromVotes(
      _get(proxy, 'voter_info.proxied_vote_weight', 0)
    )
    const producersDataModeled = producers.map(producer => {
      const modeledBp = getBpDataModeled(producer)

      rateInfo.push(modeledBp.system.parameters)

      return modeledBp
    })

    const averageParams = rateInfo.reduce(
      (acc, current, index) => {
        const community = acc.community + current.community
        const development = acc.development + current.development
        const infrastructure = acc.infrastructure + current.infrastructure
        const transparency = acc.transparency + current.transparency
        const trustiness = acc.trustiness + current.trustiness

        if (index + 1 === rateInfo.length) {
          return {
            community: community / rateInfo.length,
            development: development / rateInfo.length,
            infrastructure: infrastructure / rateInfo.length,
            transparency: transparency / rateInfo.length,
            trustiness: trustiness / rateInfo.length
          }
        }

        return {
          community,
          development,
          infrastructure,
          transparency,
          trustiness
        }
      },
      {
        community: 0,
        development: 0,
        infrastructure: 0,
        transparency: 0,
        trustiness: 0
      }
    )

    return {
      ...proxy,
      voter_info: {
        ...proxy.voter_info,
        producers: producersDataModeled
      },
      averageParams,
      data: getBPRadarData({
        colorString: proxy.owner,
        name: proxy.owner,
        parameters: averageParams
      }),
      proxiedVoteEOS,
      totalVoteEOS
    }
  })

export const getProxies = async limit => {
  const {
    data: { proxies, info }
  } = await client.query({
    variables: { limit },
    query: GET_PROXIES,
    fetchPolicy: 'network-only'
  })

  if (!proxies.length) return []

  const promiseResolved = await Promise.all(
    proxies.map(({ voter_info: voterInfo }) => {
      if (!voterInfo.producers.length) {
        return new Promise(resolve => {
          setTimeout(resolve, 100, {
            data: {
              producerList: []
            }
          })
        })
      }

      return client.query({
        variables: {
          producerList: voterInfo.producers
        },
        query: GET_PRODUCER_BY_PRODUCER_LIST,
        fetchPolicy: 'network-only'
      })
    })
  )

  const resultProxies = getResultModeled(proxies, promiseResolved)

  return { data: resultProxies, rows: info.proxies.count }
}

export const getProxy = async account => {
  const {
    data: { proxy }
  } = await client.query({
    variables: { account },
    query: GET_PROXY_BY_OWNER,
    fetchPolicy: 'network-only'
  })

  if (!proxy.length) return null

  const promiseResolved = await Promise.all(
    proxy.map(({ voter_info: voterInfo }) => {
      if (!voterInfo.producers.length) {
        return new Promise(resolve => {
          setTimeout(resolve, 100, {
            data: {
              producerList: []
            }
          })
        })
      }

      return client.query({
        variables: {
          producerList: voterInfo.producers
        },
        query: GET_PRODUCER_BY_PRODUCER_LIST,
        fetchPolicy: 'network-only'
      })
    })
  )

  const resultProxies = getResultModeled(proxy, promiseResolved)

  return resultProxies[0]
}
