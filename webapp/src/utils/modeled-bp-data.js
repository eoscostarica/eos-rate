import _get from 'lodash.get'

import getBPRadarData from './get-bp-radar-data'
import calculateEosFromVotes from './convert-votes-to-eos-votes'

const formatDecimal = number => {
  if (!number) return 0

  if (number % 1 !== 0) {
    return parseFloat(number.toFixed(1))
  }

  return number
}

export default ({
  community,
  trustiness,
  development,
  transparency,
  infrastructure,
  ...bp
}) => {
  const parameters = {
    community: formatDecimal(community),
    trustiness: formatDecimal(trustiness),
    development: formatDecimal(development),
    transparency: formatDecimal(transparency),
    infrastructure: formatDecimal(infrastructure)
  }
  const votesInEos = calculateEosFromVotes(_get(bp, 'system.total_votes', 0))

  return {
    ...bp,
    system: {
      ...bp.system,
      votesInEos,
      parameters
    },
    data: getBPRadarData({
      name: `${_get(bp, 'bpjson.org.candidate_name', 'defaultString')}-${
        bp.owner
      } ${votesInEos}`,
      parameters
    })
  }
}
