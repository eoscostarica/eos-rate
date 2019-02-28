import api from 'services/api'
import { getUserEOSAccout } from 'services/scatter'

const initialState = {
  accessToken: '',
  account: {}
}

const session = {
  state: initialState,
  reducers: {
    setToken (state, { accessToken, user }) {
      return { ...state, accessToken, user }
    },
    logout () {
      return initialState
    },
    setAccount (state, account) {
      return {
        ...state,
        account
      }
    }
  },
  effects: {
    async login ({ username, password }) {
      this.setToken(
        await api.post('auth/login', {
          username,
          password
        })
      )
    },
    async getUserEOSAccount () {
      this.setAccount(await getUserEOSAccout())
    }
  }
}

export default session
