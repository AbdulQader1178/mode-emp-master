import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import { NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  data: [],

  fetch: thunk(async (actions, _payload, { getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const response = await api.fetchStageMediaListData({
      userId: getStoreState().user.userId
    })

    if (response.ok) {
      const { result, message, data } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.fetched(data)
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  fetched: action((state, payload) => {
    if (payload) {
      state.data = payload
    }
  })
}
