import React, { useEffect, useCallback } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import check from 'check-types'

import useStorage from '../../Services/AsyncStorage'
import useDeviceInfo from '../../Lib/DeviceInfo/DeviceInfo'
import useFirebaseCloudMessaging from '../FirebaseCloudMessaging'
import useCrashlytics from '../CrashAnalytics/Crashlytics'
import NavigationService, { Routes } from '../../Navigation'
import { APP_STATE } from '../../Constants'
// import useCheckVersion from '../CheckVersion';

const AppStateContext = React.createContext()

export const AppContextProvider = props => {
  // useCheckVersion();
  // Persistance
  const { deviceId } = useDeviceInfo()
  const [appIntroState, setAppIntroState] = useStorage('@appintro', { toShowAppIntro: true })
  const { getFcmToken } = useFirebaseCloudMessaging()
  const crashlytics = useCrashlytics()

  const {
    fetchCountryCodeList,
    changeAppState
  } = useStoreActions(actions => ({ ...actions.app }))
  const {
    setFcmToken,
    setDeviceId,
    checkLogin,
    loginUser,
    logoutUser
  } = useStoreActions(actions => ({ ...actions.authN }))

  const state = useStoreState(state => state.authN.appstate)
  const userDetails = useStoreState(state => state.user.model)

  const _hideAppIntroForever = () => {
    setAppIntroState({ toShowAppIntro: false })
  }

  const _logoutUser = useCallback(async () => {
    logoutUser()
  }, [changeAppState])

  const logout = () => {
    _logoutUser()
  }

  const login = params => {
    getFcmToken()
      .then(fcmToken => {
        if (fcmToken) {
          setFcmToken(fcmToken)
          loginUser({ ...params, fcmToken })
        }
      })
  }

  useEffect(() => {
    getFcmToken()
      .then(fcmToken => {
        if (fcmToken) {
          setFcmToken(fcmToken)
        }
      })
  }, [])

  // check loggedin on mount
  useEffect(() => {
    if (deviceId) {
      setDeviceId(deviceId)
      state === APP_STATE.UNKNOWN && checkLogin()
    }
  }, [deviceId, checkLogin, state])

  useEffect(() => {
    if (check.assigned(userDetails.userId)) {
      crashlytics.onSignIn(userDetails)
    }
  }, [userDetails])

  // app state reactor
  useEffect(() => {
    if (state === APP_STATE.PRIVATE) {
      NavigationService.navigate(Routes.HOME_SCREEN)
    } else if (state === APP_STATE.PUBLIC) {
      fetchCountryCodeList()
      NavigationService.navigate(Routes.AUTH_STACK)
    } else {
      // do something if needed
    }
  }, [state])

  return (
    <AppStateContext.Provider
      value={{
        state,
        logout,
        login,
        hideAppIntroForever: _hideAppIntroForever
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  )
}

export default AppStateContext
