import _get from 'lodash.get'

const _sortValues = (firstValues, secondValues, path) => {
  const firstValue = _get(firstValues, path, 0) || 0
  const secondValue = _get(secondValues, path, 0) || 0

  return secondValue - firstValue
}

export default (sortBy, blockProducers) => {
  switch (sortBy) {
    case 'alphabetical': {
      const _getValidName = (bp) => {
        const name = _get(bp, 'bpjson.org.candidate_name', null)

        if (name && name.length) return name.toUpperCase()

        return _get(bp, 'owner').toUpperCase()
      }

      return (blockProducers || []).sort((a, b) => {
        const firstBP = _getValidName(a)
        const secondBP = _getValidName(b)

        return firstBP < secondBP ? -1 : firstBP > secondBP ? 1 : 0
      })
    }

    case 'generalRate': {
      return (blockProducers || []).sort((a, b) => _sortValues(a, b, 'average'))
    }

    case 'edenRate': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'eden_average')
      )
    }

    case 'infrastructure': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.parameters.infrastructure')
      )
    }

    case 'community': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.parameters.community')
      )
    }

    case 'trustiness': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.parameters.trustiness')
      )
    }

    case 'development': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.parameters.development')
      )
    }

    case 'transparency': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.parameters.transparency')
      )
    }

    case 'vote': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.total_votes')
      )
    }

    case 'ratings': {
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'ratings_cntr')
      )
    }

    default:
      return (blockProducers || []).sort((a, b) =>
        _sortValues(a, b, 'system.total_votes')
      )
  }
}
