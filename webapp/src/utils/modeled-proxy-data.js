import _get from 'lodash.get'

import calculateEosFromVotes from './convert-votes-to-eos-votes'
import getBPRadarData from './get-bp-radar-data'
import getBpDataModeled from './modeled-bp-data'

export default proxy => {
  const rateInfo = []
  const proxyProducers = _get(proxy, 'voter_info.producers', [])
  const proxiedVoteEOS = calculateEosFromVotes(
    _get(proxy, 'voter_info.last_vote_weight', 0)
  )
  const totalVoteEOS = calculateEosFromVotes(
    _get(proxy, 'voter_info.proxied_vote_weight', 0)
  )
  const producersDataModeled = proxyProducers.map(bp => {
    const producer = getBpDataModeled(bp)

    const {
      system: { parameters }
    } = producer

    rateInfo.push(parameters)

    return producer
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
}
