import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import { NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  orderId: null,
  model: {
    sourceCoordinates: { latitude: null, longitude: null },
    destinationCoordinates: { latitude: null, longitude: null },
    coordinates: { latitude: null, longitude: null }
  },

  setOrderId: action((state, payload) => {
    if (payload) {
      state.orderId = payload
    }
  }),

  start: thunk(async (actions, payload, { getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { sourceCoordinates: { latitude, longitude } } = payload

    const response = await api.startLocationTracking({
      userId: getStoreState().user.userId,
      employeeType: getStoreState().user.userType,
      orderId: getStoreState().orderDetails.model.orderId,
      sourceCoords: [latitude, longitude]
    })

    if (response.ok) {
      const { result, message, data } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.started(data)
        showToast(message, 'success')
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        showToast(message, 'error')
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  started: action((state, payload) => {
    if (payload) {
      const { sourceCoords, destinationCoords } = payload
      state.model.sourceCoordinates.latitude = sourceCoords[0]
      state.model.sourceCoordinates.longitude = sourceCoords[1]
      state.model.destinationCoordinates.latitude = destinationCoords[0]
      state.model.destinationCoordinates.longitude = destinationCoords[1]
    }
  }),

  send: thunk(async (actions, payload, { getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { currentCoordinates: { latitude, longitude } } = payload

    const response = await api.sendLocationTrackingData({
      userId: getStoreState().user.userId,
      employeeType: getStoreState().user.userType,
      orderId: getStoreState().orderDetails.model.orderId,
      coords: [latitude, longitude]
    })

    if (response.ok) {
      const { result, message, data } = response.data
      if (result === 1) {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        actions.updated(data)
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
      const { sourceCoords, destinationCoords, currentCoords } = payload
      state.model.sourceCoordinates.latitude = sourceCoords[0]
      state.model.sourceCoordinates.longitude = sourceCoords[1]
      state.model.destinationCoordinates.latitude = destinationCoords[0]
      state.model.destinationCoordinates.longitude = destinationCoords[1]
      state.model.coordinates.latitude = currentCoords[0]
      state.model.coordinates.longitude = currentCoords[1]
    }
  })
}
