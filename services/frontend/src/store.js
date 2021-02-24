import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'
import storage from 'redux-persist/lib/storage'

import { locationChangeListener } from 'models/location'
import * as models from 'models'

const persistPlugin = createPersistPlugin({
  key: 'root',
  storage,
  whitelist: ['blockProducers', 'settings']
})

const store = init({
  models,
  plugins: [persistPlugin]
})

locationChangeListener(store)

export default store
