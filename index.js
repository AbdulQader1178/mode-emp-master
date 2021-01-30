/**
 * @format
 */
// import './WhyDidYouRender'
import React from 'react'
import { AppRegistry } from 'react-native'
import messaging from '@react-native-firebase/messaging'

import App from './src'
import { name as appName } from './app.json'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// https://rnfirebase.io/messaging/usage#background-application-state

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
