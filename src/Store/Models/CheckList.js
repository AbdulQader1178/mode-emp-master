import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import { NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  model: {
    orderId: null,
    items: [],
    orderNumber: null,
    rating: null,
    remarks: null,
    images: null
  },
  message: null,

  fetch: thunk(async (actions, payload, { getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { orderId } = payload

    const response = await api.fetchChecklistData({
      userId: getStoreState().user.userId,
      userType: getStoreState().user.userType,
      orderId: orderId || getStoreState().orderDetails.model.orderId
    })

    if (response.ok) {
      const { result, message, data } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.fetched(data)
        actions.setMessage(message)
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        actions.setMessage(message)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  fetched: action((state, payload) => {
    if (payload) {
      state.model = payload
    }
  }),

  update: thunk(async (actions, payload, { getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { remarks, images, items } = payload || { remarks: '', images: '', items: [] }

    const response = await api.updateChecklistFeedbackData({
      userId: getStoreState().user.userId,
      userType: getStoreState().user.userType,
      orderId: getStoreState().orderDetails.model.orderId,
      remarks,
      images,
      items
    })

    if (response.ok) {
      const { result, message, data } = response.data

      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        showToast(message, 'success')
        dispatch.orderList.fetch()
        dispatch.orderDetails.fetch()
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  updated: action((state, payload) => {
    if (payload) {
      state.model = payload
    }
  }),

  setMessage: action((state, payload) => {
    if (payload) {
      state.message = payload
    }
  })
}
