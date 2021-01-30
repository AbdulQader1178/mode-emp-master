import { action, thunk } from 'easy-peasy'
import { iOSColors } from 'react-native-typography'

import { NETWORK_STATUS, APP_STATE } from '../../Constants'
import BaseModel from './Base'

export default {
  ...BaseModel(),

  appstate: APP_STATE.UNKNOWN,
  language: 1,
  introData: [],
  userTypeList: [],

  checkAppVersion: thunk(async (actions, payload, { injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)
    // let response = await api.checkAppVersion();
    // if (response.ok) {
    // let version = 9;
    // actions.setVersion(version);
    // }
    actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
  }),

  fetchIntroData: thunk(async (actions, payload, { injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)
    const response = await api.fetchIntroData(payload)
    actions.setIntroData(response.data)
  }),

  fetchUserTypeList: thunk(async (actions, _payload, { injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const response = await api.fetchUserTypeListData()

    if (response.ok) {
      actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
      actions.fetchedUserTypeList(response.data.data)
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  fetchCountryCodeList: thunk(async (actions, payload, { injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const response = await api.fetchCountryCodeListData(payload)

    if (response.ok) {
      actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
      actions.fetchedCountryCodeList(response.data.data)
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  changeAppState: action((state, payload) => {
    state.appstate = payload
  }),

  setVersion: action((state, version) => {
    state.version = version
  }),

  setIntroData: action((state, payload) => {
    state.introData = payload
  }),

  fetchedUserTypeList: action((state, payload) => {
    if (payload) {
      state.userTypeList = payload
    }
  }),

  fetchedCountryCodeList: action((state, payload) => {
    if (payload) {
      state.countryCodeList = payload
    }
  })
}
