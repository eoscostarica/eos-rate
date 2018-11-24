import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'
import { findBPs } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  selected: [],
  currentBP: [],
  compareTool: true
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
    },
    setCurrentBP (state, bp) {
      return {
        ...state,
        currentBP: bp
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
    },
    async getBP (name, state) {
      const { blockProducers } = state
      const { list } = blockProducers
      const bp = list.filter(b => b.producer_account_name === name)
      this.setCurrentBP(bp)
    }
  }
}

export default blockProducers
