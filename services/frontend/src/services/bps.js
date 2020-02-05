import mockedBPs from 'mock/bps'
import client from 'services/graphql'
import gql from 'graphql-tag'
import getBPRadarData from 'utils/getBPRadarData'

export const getAllBPs = ({ nameFilter = '', setBPs = () => {} } = {}) =>
  client
    .subscribe({
      query: gql`
        subscription blockProducers($nameFilter: String!) {
          producers_list(
            where: { _or: { candidate_name: { _ilike: $nameFilter } } }
            order_by: { total_votes: desc }
          ) {
            owner
            system
            bpjson
          }
        }
      `,
      variables: {
        nameFilter: `%${nameFilter}%`
      }
    })
    .subscribe({
      next ({ data: { producers_list: producers } }) {
        const BPs = producers.map(producer => {
          const parameters = {
            community: 0,
            trustiness: 0,
            development: 0,
            transparency: 0,
            infrastructure: 0
          }

          return {
            ...producer,
            system: {
              ...producer.system,
              parameters
            },
            data: getBPRadarData({
              name: producer.owner,
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

export const findBPs = async (filter = {}) => mockedBPs

export const findBPById = async id => mockedBPs[id]

window.getAllBPs = getAllBPs
