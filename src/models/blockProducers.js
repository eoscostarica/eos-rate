import { findBPs } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

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
      const blockProducers = await findBPs()
      this.setBPs(
        blockProducers.map(blockProducer => ({
          ...blockProducer,
          data: getBPRadarData(blockProducer)
        }))
      )
    }
  }
}

export default blockProducers
