import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'
import { findBPs } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  selected: []
}

const blockProducers = {
  state: initialState,
  reducers: {
    setBPs (state, list) {
      // Whenever we get a new list, clear filters
      return {
        ...initialState,
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
