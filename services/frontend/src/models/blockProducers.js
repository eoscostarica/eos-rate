import filterObjects from 'filter-objects'
import uniq from 'lodash.uniq'
import { getAllBPs } from 'services/bps'

const initialState = {
  filters: {},
  list: [],
  filtered: [],
  selected: [],
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
    }
  }
}

export default blockProducers
