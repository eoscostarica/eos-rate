import _get from 'lodash.get'

import getBPRadarData from './get-bp-radar-data'
import calculateEosFromVotes from './convert-votes-to-eos-votes'

export default ({
  community,
  trustiness,
  development,
  transparency,
  infrastructure,
  ...bp
}) => {
  const parameters = {
    community: community || 0,
    development: development || 0,
    infrastructure: infrastructure || 0,
    transparency: transparency || 0,
    trustiness: trustiness || 0
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
      name: _get(bp, 'bpjson.org.candidate_name', bp.owner),
      parameters
    })
  }
}
