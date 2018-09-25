import api from '../services/api'

const initialState = {
  accessToken: null,
  user: null
}

const session = {
  state: initialState,
  reducers: {
    setToken (state, { accessToken, user }) {
      return { ...state, accessToken, user }
    },
    logout () {
      return initialState
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
    }
  }
}

export default session
