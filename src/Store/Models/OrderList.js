import { action, thunk, computed } from 'easy-peasy'
import moment from 'moment'

import BaseModel from './Base'
import { NETWORK_STATUS, ASSIGNMENT_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'
import check from 'check-types'

export default {
  ...BaseModel(),

  data: [],

  currentDayData: computed(state => (
    state.data.filter(item => (
      (moment(item.scheduleDateTime).isSame(moment(), 'day') &&
        item.stageId !== ASSIGNMENT_STATUS.DELIVERY_COMPLETED.id) ||
      (moment(item.scheduleDateTime).isSame(moment(), 'day') &&
        item.stageId !== ASSIGNMENT_STATUS.FITTING_COMPLETED.id)
    ))
  )),

  upcomingData: computed(state => (
    state.data.filter(item => (
      (moment(item.scheduleDateTime).isAfter(moment(), 'day') &&
        item.stageId !== ASSIGNMENT_STATUS.DELIVERY_COMPLETED.id) ||
      (moment(item.scheduleDateTime).isAfter(moment(), 'day') &&
        item.stageId !== ASSIGNMENT_STATUS.DELIVERY_COMPLETED.id)
    ))
  )),

  // assignmentCompletedData: computed(state => (
  //   // state.data.filter(item => item.stageId === ASSIGNMENT_STATUS.DELIVERY_COMPLETED.id)
  // )),

  fetch: thunk(async (actions, payload, { getStoreState, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const response = await api.fetchOrderListData({
      userId: getStoreState().user.userId,
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
        actions.fetched([])
      }
    } else {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
    }
  }),

  fetched: action((state, payload) => {
    if (payload) {
      state.data = payload
    }
  }),

  resetUnreadMessagesCount: action((state, payload) => {
    const { orderId } = payload
    if (check.nonEmptyArray(state.data)) {
      state.data = state.data.map(item => {
        if (item.orderId === orderId) {
          return { ...item, unreadCount: 0 }
        }

        return item
      })
    }
  })
}
