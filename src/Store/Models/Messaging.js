import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import { MESSAGE_SENDER_TYPE, NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  orderId: null,
  model: {
    orderId: null,
    orderNumber: null,
    messages: []
  },

  setOrderId: action((state, payload) => {
    if (payload) {
      state.orderId = payload
    }
  }),

  fetch: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const orderId = payload && payload.orderId
      ? payload.orderId
      : getState().orderId

    const response = await api.fetchMessageBoardData({
      userId: getStoreState().user.userId,
      senderType: MESSAGE_SENDER_TYPE.SALES_PERSON.id,
      orderId
    })

    if (response.ok) {
      const { result, message, data } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.fetched(data)
        dispatch.orderList.resetUnreadMessagesCount({ orderId })
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
      state.model = payload
    }
  }),

  create: thunk(async (actions, payload, { getState, getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { text } = payload

    const response = await api.updateMessageBoardData({
      userId: getStoreState().user.userId,
      senderType: MESSAGE_SENDER_TYPE.SALES_PERSON.id,
      orderId: getState().orderId,
      text
    })

    if (response.ok) {
      const { result, message } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.fetch()
        showToast(message, 'success')
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  })
}
