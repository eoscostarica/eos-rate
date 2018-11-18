import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'
import { findBPs } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  selected: []
  currentBP: []
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
    },
    setCurrentBP (state, bp) {
      console.log('BP >>', bp)
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
      console.log('BP >>', bp)
      this.setCurrentBP(bp)
    }
  }
}

export default blockProducers
