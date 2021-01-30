/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'

import Root from './App'
import useFirebaseCloudMessaging from './Services/FirebaseCloudMessaging'

const App = () => {
  const { init: fcmInit } = useFirebaseCloudMessaging()

  useEffect(() => {
    fcmInit()
  }, [])

  return <Root />
}

export default App
