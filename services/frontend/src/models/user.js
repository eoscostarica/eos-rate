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
      console.log({ accountName })

      const account = accountName ? await eosjsAPI.rpc.get_account(accountName) : null
      // const producers = _get(account, 'voter_info.producers', [])
      // const proxy = _get(account, 'voter_info.proxy', '')

      console.log({ account })

      this.setUser(account)
      // producers.length && dispatch.blockProducers.addArrayToSelected(producers)
      // proxy.length && dispatch.proxies.addToSelected(proxy)

      // if (
      //   (producers.length || proxy.length) &&
      //   !state.blockProducers.compareTool
      // )
      //   dispatch.blockProducers.toggleCompareTool()
    }
  })
}

export default user
