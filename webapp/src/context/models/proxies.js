import { client } from '../../graphql'
import { GET_PROXIES, GET_PRODUCER_BY_PRODUCER_LIST } from '../../gql'

export const getProxies = async () => {
  const {
    data: { proxies }
  } = await client.query({
    variables: {},
    query: GET_PROXIES,
    fetchPolicy: 'network-only'
  })

  const promiseResolved = await Promise.all(
    proxies.map(({ voter_info: voterInfo }) => {
      return client.query({
        variables: {
          producerList: voterInfo.producers
        },
        query: GET_PRODUCER_BY_PRODUCER_LIST,
        fetchPolicy: 'network-only'
      })
    })
  )

  const resultProxies = proxies.map((proxy, index) => {
    const producers = promiseResolved[index].data.producerList

    return { ...proxy, voter_info: { ...proxy.voter_info, producers } }
  })

  return resultProxies
}
