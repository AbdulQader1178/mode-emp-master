import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootSiblingParent } from 'react-native-root-siblings'
import { StoreProvider } from 'easy-peasy'

import createStore from './Store'
import AppNavigator from './Navigation/AppNavigator'

import { ThemeProvider } from './DesignSystem/Context/ThemeContext'
import { AppContextProvider } from './Services/Auth/AppContext'
import { DeviceInfoProvider } from './Lib/DeviceInfo/Context'
import { LocaleContextProvider } from './i18n/LocaleContext'
import { NetInfoProvider } from './Lib/NetInfo/Context'
import { NotificationModal } from './Domain'

// create the easy store
const store = createStore()

// return root component
export default () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ duration: 250 })
    }, 500)
  }, [])

  return (
    <SafeAreaProvider>
      <DeviceInfoProvider>
        <NetInfoProvider>
          <LocaleContextProvider>
            <StoreProvider store={store}>
              <StatusBar translucent />
              <ThemeProvider>
                <AppContextProvider>
                  <RootSiblingParent>
                    <AppNavigator />
                    <NotificationModal />
                  </RootSiblingParent>
                </AppContextProvider>
              </ThemeProvider>
            </StoreProvider>
          </LocaleContextProvider>
        </NetInfoProvider>
      </DeviceInfoProvider>
    </SafeAreaProvider>
  )
}
