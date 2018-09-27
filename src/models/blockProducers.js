import filterObjects from 'filter-objects'
import { findBPs } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

const initialState = {
  filters: {},
  list: [],
  filtered: []
}

const blockProducers = {
  state: initialState,
  reducers: {
    setBPs (state, list) {
      // Whenever we get a new list, clear filters
      return {
        ...initialState,
        list
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
        filtered,
        filters
      }
    }
  },
  effects: {
    async getBPs () {
      const blockProducers = await findBPs()
      this.setBPs(
        blockProducers.map(blockProducer => ({
          ...blockProducer,
          data: getBPRadarData(blockProducer)
        }))
      )
    },
    async applyFilter (filters, state) {
      this.setFiltered(
        filterObjects.filter(filters, state.blockProducers.list),
        filters
      )
    }
  }
}

export default blockProducers
