import mockedBPs from 'mock/bps'
import client from 'services/graphql'
import gql from 'graphql-tag'
import getBPRadarData from 'utils/getBPRadarData'

export const getAllBPs = ({ nameFilter = null, setBPs = () => {} } = {}) => {
  const containsActive = {
    system: {
      _contains: {
        is_active: 1
      }
    }
  }
  const nameFilerObject = {
    _or: { candidate_name: { _ilike: `%${nameFilter}%` } }
  }
  const whereFilter = nameFilter
    ? { ...containsActive, ...nameFilerObject }
    : { ...containsActive }

  return client
    .subscribe({
      query: gql`
        subscription blockProducers($where: producers_list_bool_exp!) {
          producers_list(
            where: $where
            order_by: [{ bpjson: desc }, { total_votes: desc }]
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
          }
        }
      `,
      variables: {
        where: whereFilter
      }
    })
    .subscribe({
      next ({ data: { producers_list: producers } }) {
        const BPs = producers.map(producer => {
          const {
            community,
            trustiness,
            development,
            transparency,
            infrastructure,
            ...bp
          } = producer
          const parameters = {
            community: community || 0,
            development: development || 0,
            infrastructure: infrastructure || 0,
            transparency: transparency || 0,
            trustiness: trustiness || 0
          }

          return {
            ...bp,
            system: {
              ...bp.system,
              parameters
            },
            data: getBPRadarData({
              name: bp.owner,
              parameters
            })
          }
        })

        return setBPs(BPs)
      },
      error (err) {
        console.error('err', err)
      }
    })
}

export const findBPs = async (filter = {}) => mockedBPs

export const findBPById = async id => mockedBPs[id]

window.getAllBPs = getAllBPs
