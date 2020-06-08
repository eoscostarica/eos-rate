import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'

import apolloClient from 'services/graphql'
import { getAllBPs } from 'services/bps'
import eosjsAPI from 'services/eosjs-api'

import QUERY_PRODUCER from './query_get_producer_by'
import QUERY_RATING from './query_get_bp_rating_by'
import MUTATION_UPDATE_RATING from './mutation_update_rate'

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  sortBy: null,
  selected: [],
  compareTool: false,
  producer: null,
  userRate: null,
  showSortSelected: false
}

const Proxies = {
  state: initialState,
  reducers: {
    toggleCompareTool (state) {
      return {
        ...state,
        compareTool: !state.compareTool
      }
    },
    setShowSortSelected (state, showSortSelected) {
      return {
        ...state,
        showSortSelected
      }
    },
    setBPs (state, list) {
      // Whenever we get a new list, clear filters
      return {
        ...state,
        filters: {},
        filtered: [],
        list: list.map(bp => ({ ...bp }))
      }
    },
    updateBPList (state, list) {
      return {
        ...state,
        list
      }
    },
    addToSelected (state, producerAccountName) {
      return {
        ...state,
        selected: uniq([...state.selected, producerAccountName])
      }
    },
    addArrayToSelected (state, producerAccountNames) {
      return {
        ...state,
        selected: uniq([...state.selected, ...producerAccountNames])
      }
    },
    removeSelected (state, producerAccountName) {
      return {
        ...state,
        selected: state.selected.filter(
          selected => selected !== producerAccountName
        )
      }
    },
    clearSelected (state) {
      return {
        ...state,
        selected: []
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
    },
    setSortBy (state, sort) {
      return {
        ...state,
        sortBy: sort
      }
    },
    addProducer (state, producer) {
      return { ...state, producer }
    },
    addUserRate (state, userRate) {
      return { ...state, userRate }
    }
  },
  effects: dispatch => ({
    async getBPs () {
      return getAllBPs({
        setBPs: state => this.setBPs(state)
      })
    },
    async applyFilter (filters, state) {
      this.setFiltered(
        filterObjects.filter(filters, state.blockProducers.list),
        filters
      )
    },
    async getBlockProducerByOwner (owner, state) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const {
          data: { producers }
        } = await apolloClient.query({
          variables: { owner },
          query: QUERY_PRODUCER
        })

        if (!producers.length) {
          this.addProducer(null)
          dispatch.isLoading.storeIsContentLoading(false)

          return
        }

        const blockProducer = producers[0]
        const bpData =
          blockProducer.owner &&
          (state.blockProducers.list || []).find(
            ({ owner }) => owner === blockProducer.owner
          )

        this.addProducer({
          ...blockProducer,
          average: bpData ? bpData.average : 0,
          ratings_cntr: bpData ? bpData.ratings_cntr : 0,
          general_info: bpData ? bpData.general_info : {},
          system: {
            ...blockProducer.system,
            votesInEos: bpData ? bpData.system.votesInEos : 0,
            parameters: bpData ? bpData.system.parameters : {}
          },
          data: bpData ? bpData.data : []
        })
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getBlockProducerByOwner', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    },
    async getBlockProducerRatingByOwner ({ bp, userAccount }, state) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const {
          data: { user_ratings: userRatings }
        } = await apolloClient.query({
          variables: { bp, user: userAccount },
          query: QUERY_RATING
        })

        this.addUserRate(userRatings.length ? userRatings[0].ratings : null)
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getBlockProducerRatingByOwner', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    },
    async mutationInsertUserRating ({ user, bp, result, ...ratings }, state) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const { data: { rateProducer } } = await apolloClient.mutate({
          variables: {
            ratingInput: { producer: bp, user }
          },
          mutation: MUTATION_UPDATE_RATING
        })

        const { rows: rateStat } = await eosjsAPI.rpc.get_table_rows({
          json: true,
          code: 'rateproducer',
          scope: 'rateproducer',
          table: 'stats',
          lower_bound: bp,
          limit: 1,
          reverse: false,
          show_payer: false
        })

        const producerUpdatedList = state.blockProducers.list.map(producer => {
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
        const currentBP = producerUpdatedList.find(
          producer => producer.owner === bp
        )

        this.addProducer(currentBP)
        this.updateBPList(producerUpdatedList)
        this.getBlockProducerRatingByOwner({ bp, userAccount: user })
        dispatch.user.getUserRates({ userRate: { ...rateProducer, ...currentBP } })
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('mutationInsertUserRating', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    }
  })
}

export default Proxies
