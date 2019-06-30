import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'

import { locationChangeListener } from 'models/location'
import * as models from 'models'

const persistPlugin = createPersistPlugin({
  whitelist: ['blockProducers', 'settings']
})

const store = init({
  models,
  plugins: [persistPlugin]
})

locationChangeListener(store)

export default store
