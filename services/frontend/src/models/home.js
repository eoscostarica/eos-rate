import { findBPById } from 'services/bps'
import getBPRadarData from 'utils/getBPRadarData'

const initialState = {
  isPlaying: false,
  blockProducer: null
}

const home = {
  state: initialState,

  reducers: {
    setBP (state, blockProducer) {
      return {
        ...state,
        blockProducer
      }
    }
  },

  effects: {
    async getBlockData () {
      const blockProducer = await findBPById(0)
      this.setBP({
        ...blockProducer,
        data: getBPRadarData({
          name: blockProducer.org.candidate_name,
          parameters: blockProducer.parameters
        })
      })
    }
  }
}

export default home
