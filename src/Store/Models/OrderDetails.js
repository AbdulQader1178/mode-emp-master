import { action, thunk } from 'easy-peasy'
import allSettled from 'promise.allsettled'

import BaseModel from './Base'
import { NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  model: {
    orderId: null,
    orderType: null,
    orderNumber: null,
    orderDate: null,
    orderDueDate: null,
    stageId: null,
    currency: null,
    vatAmount: null,
    orderTotal: null,
    scheduleDateTime: null,
    status: null,
    images: [],
    messagesUnreadCount: '0'
  },
  stageList: [],
  customerFeedback: {
    questions: []
  },

  setOrderId: action((state, payload) => {
    state.model.orderId = payload
  }),

  resetMessagesUnreadCount: action((state) => {
    state.model.messagesUnreadCount = '0'
  }),

  fetch: thunk(async (actions, payload, { getState, getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { orderId } = payload || { orderId: null }

    const response = await api.fetchOrderDetailsData({
      userId: getStoreState().user.userId,
      orderId: orderId || getState().model.orderId,
      userType: getStoreState().user.userType
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
      state.model = payload
    }
  }),

  update: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { status } = payload

    const response = await api.updateOrderStatusData({
      userId: getStoreState().user.userId,
      orderId: getState().model.orderId,
      userType: getStoreState().user.userType,
      status
    })

    if (response.ok) {
      const { result, message } = response.data

      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        if (status === 'intransit') {
          // actions.fetch()
          dispatch.orderList.fetch()
        }
        showToast(message, 'success')
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  updateConfirm: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { status, otp } = payload

    const response = await api.updateOrderStatusConfirmData({
      userId: getStoreState().user.userId,
      orderId: getState().model.orderId,
      userType: getStoreState().user.userType,
      status,
      otp
    })

    if (response.ok) {
      const { result, message } = response.data

      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        // actions.fetch()
        dispatch.orderList.fetch()
        showToast(message)
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  fetchCustomerFeedback: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { orderId } = payload

    const response = await api.fetchCustomerFeedbackData({
      userId: getStoreState().user.userId,
      orderId: orderId || getState().model.orderId,
      employeeType: getStoreState().user.userType
    })

    if (response.ok) {
      const { result, message, data } = response.data

      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.fetchedCustomerFeedback(data)
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
      showToast(`Failed to fetch feedback\n${response.status} ${response.problem}`, 'error')
    }
  }),

  fetchedCustomerFeedback: action((state, payload) => {
    if (payload) {
      state.customerFeedback = payload
    }
  }),

  updateCustomerLocationCoordinates: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { latitude, longitude } = payload

    const response = await api.updateCustomerLocationCoordinatesData({
      userId: getStoreState().user.userId,
      orderId: getState().model.orderId,
      latitude: latitude.toString(),
      longitude: longitude.toString()
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
      showToast(`Failed to update location\n${response.status} ${response.problem}`, 'error')
    }
  }),

  updateMeasurementImages: thunk(async (actions, payload, { getState, getStoreState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const totalCount = payload.length

    const promises = payload
      .map(item => (
        api.uploadMeasurementImages({
          userId: getStoreState().user.userId,
          orderId: getState().model.orderId,
          uploadedImages: [item]
        })
      ))

    allSettled(promises).then(function (results) {
      const uploadFailureCount = results.map(({ status }) => status === 'rejected').length
      const successfulUploadCount = totalCount - uploadFailureCount

      // if (successfulUploadCount === totalCount) {
      //   actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
      //   showToast(`${successfulUploadCount}/${totalCount} uploaded`, 'success')
      // } else {
      //   actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
      //   showToast(`${successfulUploadCount}/${totalCount} uploaded`, 'error')
      // }

      actions.fetch()
    })
  })
}
