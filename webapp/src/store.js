import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'

import * as models from './models'

const persistPlugin = createPersistPlugin({
  key: 'smartgate',
  whitelist: ['session', 'settings']
})

const store = init({
  models,
  plugins: [persistPlugin]
})

export default store
