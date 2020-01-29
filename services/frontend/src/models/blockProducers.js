import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'
import apolloClient from 'services/graphql'
import { getAllBPs } from 'services/bps'
import gql from 'graphql-tag'

const QUERY_PRODUCER = gql`
  query getProducer($owner: String) {
    producers(where: { owner: { _eq: $owner } }) {
      bpjson
      owner
    }
  }
`

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  selected: [],
  compareTool: true,
  producer: {}
}

const blockProducers = {
  state: initialState,
  reducers: {
    toggleCompareTool (state) {
      return {
        ...state,
        compareTool: !state.compareTool
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
    addToSelected (state, producerAccountName) {
      return {
        ...state,
        selected: uniq([...state.selected, producerAccountName])
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
    addProducer (state, producer) {
      return { producer }
    }
  },
  effects: {
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
        const {
          data: { producers }
        } = await apolloClient.query({
          variables: { owner },
          query: QUERY_PRODUCER
        })

        const blockProducer = producers[0]
        const bpData =
          blockProducer.owner &&
          (state.blockProducers.list || []).find(
            ({ owner }) => owner === blockProducer.owner
          )

        this.addProducer({ ...blockProducer, data: bpData.data || [] })
      } catch (error) {
        console.error('getBlockProducerByOwner', error)
      }
    }
  }
}

export default blockProducers
