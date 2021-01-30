import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import AsyncStorage from '@react-native-community/async-storage'

console.tron = Reactotron
console.disableYellowBox = true

const reactotronConfig = {
  initiate: () => {
    Reactotron
      .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
      .configure() // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .use(reduxPlugin())
      .connect() // let's connect!
  },
  createEnhancer: () => Reactotron.createEnhancer()
}

export default reactotronConfig
