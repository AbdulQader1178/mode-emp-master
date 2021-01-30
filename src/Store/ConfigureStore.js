import { createStore } from 'easy-peasy'
import navigationDebouncer from 'react-navigation-redux-debouncer'

let storeEnhancers = []
let devTools = false

if (__DEV__) {
  const reactotron = require('../../ReactotronConfig').default
  reactotron.initiate()
  storeEnhancers = [...storeEnhancers, reactotron.createEnhancer()]
  devTools = true
}

const store = (model, api) => {
  return createStore(model, {
    name: 'easystore',
    /**
     * for api injecting using injections
     */
    injections: { api },
    devTools,
    // middleware: [navigationDebouncer(600)],
    enhancers: [...storeEnhancers]
  })
}

export default store
