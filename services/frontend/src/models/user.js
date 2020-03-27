import _get from 'lodash.get'

import eosjsAPI from 'services/eosjs-api'

const initialState = {
  data: null
}

const user = {
  state: initialState,

  reducers: {
    setUser (state, data) {
      return {
        ...state,
        data
      }
    }
  },

  effects: dispatch => ({
    async getUserChainData ({ accountName }, state) {
      const account = await eosjsAPI.rpc.get_account(accountName)
      const producers = _get(account, 'voter_info.producers', [])
      const proxy = _get(account, 'voter_info.proxy', '')

      // console.log('STORE PAPEEEE!', { account, state })

      this.setUser(account)
      producers.length && dispatch.blockProducers.addArrayToSelected(producers)
      proxy.length && dispatch.proxies.addToSelected(proxy)

      // if (
      //   (producers.length || proxy.length) &&
      //   !state.blockProducers.compareTool
      // )
      //   dispatch.blockProducers.toggleCompareTool()
    }
  })
}

export default user
