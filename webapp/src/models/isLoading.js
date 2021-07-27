export default {
  state: {
    isContentLoading: false
  },

  reducers: {
    storeIsContentLoading(state, isLoading) {
      return {
        ...state,
        isContentLoading: isLoading
      }
    }
  }
}
