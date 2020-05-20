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
    async getUserChainData ({ accountName }, { user, blockProducers }) {
      try {
        if (user.data && user.data.account_name === accountName) return

        let account = null
        const { rpc } = eosjsAPI

        if (accountName.length) {
          account = await rpc.get_account(accountName)
        }

        const producers = _get(account, 'voter_info.producers', [])
        const proxy = _get(account, 'voter_info.proxy', '')

        this.setUser(account ? { ...account, hasProxy: Boolean(proxy.length), producersCount: producers.length } : null)

        if (producers.length) {
          const filterBPs = producers.filter(bpName =>
            blockProducers.list.find(({ owner }) => bpName === owner)
          )

          dispatch.blockProducers.addArrayToSelected(filterBPs)
        }
        proxy.length && dispatch.proxies.addToSelected(proxy)

        if ((producers.length || proxy.length) && !blockProducers.compareTool) {
          dispatch.blockProducers.toggleCompareTool()
        }
      } catch (error) {
        console.error('getUserChainData', error)
        this.setUser(null)
      }
    },
    async removeBlockProducersVotedByUser () {
      this.setUser(null)
      dispatch.blockProducers.clearSelected()
    }
  })
}

export default user
