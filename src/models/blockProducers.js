import { findBPs } from 'services/bps'

const initialState = {
  list: []
}

const blockProducers = {
  state: initialState,
  reducers: {
    setBPs (state, list) {
      return {
        list
      }
    }
  },
  effects: {
    async getBPs () {
      this.setBPs(await findBPs())
    }
  }
}

export default blockProducers
