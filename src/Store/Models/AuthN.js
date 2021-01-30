import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import {
  setLoginCredentials,
  getLoginCredentials,
  resetLoginCredentials
} from '../../Services/Keychain'
import { NETWORK_STATUS, APP_STATE } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  appstate: APP_STATE.UNKNOWN,

  userId: null,
  token: null,
  deviceId: null,
  fcmToken: null,

  setUserId: action((state, payload) => {
    state.userId = payload
  }),

  setToken: action((state, payload) => {
    state.token = payload
  }),

  setDeviceId: action((state, payload) => {
    state.deviceId = payload
  }),

  setFcmToken: action((state, payload) => {
    state.fcmToken = payload
  }),

  checkLogin: thunk(async (actions, _payload, { injections: { api } }) => {
    const credentials = await getLoginCredentials()

    if (credentials && credentials.username && credentials.username.indexOf('-') > -1) {
      const { username, password } = credentials
      const [callingCode, mobile] = username.split('-')

      actions.loginUser({ callingCode, mobile, password })
    } else {
      actions.changeAppState(APP_STATE.PUBLIC)
    }
  }),

  loginUser: thunk(async (actions, payload, { getState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)
    dispatch.app.changeAppState(APP_STATE.AUTH)
    const { mobile, password, callingCode } = payload
    const response = await api.loginUser({
      mobile,
      password,
      callingCode,
      deviceId: getState().deviceId,
      fcmToken: getState().fcmToken
    })
    if (!response.ok) {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
      actions.changeAppState(APP_STATE.PUBLIC)
      actions.setError()
      showToast(`An error has occurred while trying to log you in\n${response.status} ${response.problem}`, 'error')
    } else {
      const { result, message, data } = response.data

      if (result === 0) {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        actions.changeAppState(APP_STATE.PUBLIC)
        actions.setError()
        showToast(message, 'error')
        return
      }

      const { userId, userType } = data

      actions.setUserId(userId)

      actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
      actions.changeAppState(APP_STATE.PRIVATE)

      // Set the user id and phone number
      dispatch.user.setUserId(userId)
      dispatch.user.setUserType(userType)
      dispatch.user.setUserDetails(data)

      setLoginCredentials(`${callingCode}-${mobile}`, password)
    }

    // dispatch.user.requestUserProfile();
  }),

  logoutUser: thunk(async (actions, payload, { dispatch }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.NOT_STARTED)
    actions.changeAppState(APP_STATE.PUBLIC)
    actions.setUserId(null)
    actions.setToken(null)
    resetLoginCredentials()
  }),

  changeAppState: action((state, payload) => {
    state.appstate = payload
  }),

  setError: action((state, payload) => {
    state.error = true
  }),

  onLoginInputChange: action((state, { key, value }) => {
    state[key] = value
  })
}
