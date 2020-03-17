import _get from 'lodash.get'
import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'

import getBPRadarData from 'utils/getBPRadarData'
import apolloClient from 'services/graphql'

import QUERY_GET_PROXIES from './query_get_proxies'
import QUERY_GET_PROXY_BY_OWNER from './query_get_proxy_by_owner'

const initialState = {
  proxies: [],
  compareTool: true,
  proxy: null,
  filters: {},
  filtered: [],
  selected: [],
}

const Proxies = {
  state: initialState,
  reducers: {
    toggleCompareTool(state) {
      return {
        ...state,
        compareTool: !state.compareTool
      }
    },
    addProxies(state, proxies) {
      return {
        ...state,
        proxies,
        filters: {},
        filtered: []
      }
    },
    addProxy(state, proxy) {
      return { ...state, proxy }
    },
    addToSelected (state, owner) {
      return {
        ...state,
        selected: uniq([...state.selected, owner])
      }
    },
    removeSelected (state, owner) {
      return {
        ...state,
        selected: state.selected.filter(
          selected => selected !== owner
        )
      }
    },
    clearFilters (state) {
      return {
        ...state,
        filtered: [],
        filters: {}
      }
    },
    setFiltered (state, filtered, filters) {
      return {
        ...state,
        filtered: [...filtered],
        filters: { ...filters }
      }
    }
  },
  effects: dispatch => ({
    async applyFilter (filters, state) {
      this.setFiltered(
        filterObjects.filter(filters, state.proxies.proxies),
        filters
      )
    },
    async getProxies(payload, { blockProducers: { list } }) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const {
          data: { proxies }
        } = await apolloClient.query({
          variables: {},
          query: QUERY_GET_PROXIES
        })

        if (!proxies.length) {
          this.addProxies(null)
          dispatch.isLoading.storeIsContentLoading(false)

          return
        }
        const proxiesModeled = proxies.map(proxy => {
          const rateInfo = []
          const proxyProducers = _get(proxy, 'voter_info.producers', [])
          const producersDataModeled = proxyProducers.map(owner => {
            const producer = list.find(bp => bp.owner === owner)

            if (producer) {
              const {
                system: { parameters }
              } = producer

              rateInfo.push(parameters)

              return producer
            }

            return { owner }
          })

          const averageParams = rateInfo.reduce(
            (acc, current, index) => {
              const community = acc.community + current.community
              const development = acc.development + current.development
              const infrastructure = acc.infrastructure + current.infrastructure
              const transparency = acc.transparency + current.transparency
              const trustiness = acc.trustiness + current.trustiness

              if ((index + 1) === rateInfo.length) {
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
              name: proxy.owner,
              parameters: averageParams
            })
          }
        })

        this.addProxies(proxiesModeled)
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getProxies', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    },
    async getProxyByOwner(payload, state) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const {
          data: { proxies }
        } = await apolloClient.query({
          variables: { owner: payload },
          query: QUERY_GET_PROXY_BY_OWNER
        })

        if (!proxies.length) {
          this.addProxy(null)
          dispatch.isLoading.storeIsContentLoading(false)

          return
        }

        const proxy = proxies[0]
        const proxyModeled = state.proxies.proxies.find(({ owner }) => owner === proxy.owner)

        this.addProxy({ ...proxy, ...proxyModeled })
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getProxy', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    }
    // async getProxies () {
    //   try {
    //     dispatch.isLoading.storeIsContentLoading(true)

    //   } catch (error) {
    //     dispatch.isLoading.storeIsContentLoading(false)
    //   }
    // },
  })
}

export default Proxies
