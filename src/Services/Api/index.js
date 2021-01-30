import { create } from 'apisauce'

import { BASE_URL } from '../../Config'
import apiMonitor from './Monitor'

export const URIS = {
  CHECK_LIST: 'employee/checklist',
  CHECK_LIST_FEEDBACK: 'employee/checklist_feedback',
  COUNTRY_CODE_LIST: '/country_codes',
  CUSTOMER_FEEDBACK: '/customer_feedback',
  LOCATION_TRACKING_START: '/employee/location_tracking/start',
  LOCATION_TRACKING_SEND: '/employee/location_tracking/send',
  LOGIN: 'employee/user_login',
  MESSAGE_BOARD_LIST: '/messageboard/sales_orders',
  MESSAGE_BOARD: '/messageboard',
  MESSAGE_BOARD_UPDATE: '/messageboard/send',
  ORDER_LIST: 'employee/order_list',
  ORDER_DETAILS: 'employee/order_details',
  SIGN_UP: 'employee/user_registration',
  UPDATE_ORDER_STATUS: 'employee/update_order_status',
  UPDATE_ORDER_STATUS_CONFIRM: 'employee/update_order_status/confirm',
  UPLOAD_CUSTOMER_LOCATION: '/employee/updateLatLong',
  UPLOAD_MEASUREMENT_IMAGES: '/employee/measurementImages',
  USER_TYPE_LIST: '/employee/user_types'
}

const createApiClient = (baseURL = BASE_URL) => {
  const api = create({
    baseURL,
    headers: {
    },
    timeout: 15000
  })

  // api.addMonitor(apiMonitor)
  // use interceptor if using oAuth for authentication
  // setInterceptor(api);

  const setHeaders = (params) => {
    for (const key in params) {
      api.setHeader(key, params[key])
    }
  }

  // kickoff our api functions
  return {
    // client modifiers
    setHeaders,

    fetchCountryCodeListData: () => {
      return api.post(URIS.COUNTRY_CODE_LIST)
    },

    fetchUserTypeListData: () => {
      return api.post(URIS.USER_TYPE_LIST)
    },

    signUpUser: payload => {
      return api.post(URIS.SIGN_UP, payload)
    },

    loginUser: payload => {
      setHeaders({ lang: 'en' })
      return api.post(URIS.LOGIN, payload)
    },

    fetchOrderListData: payload => {
      return api.post(URIS.ORDER_LIST, payload)
    },

    fetchOrderDetailsData: payload => {
      return api.post(URIS.ORDER_DETAILS, payload)
    },

    fetchChecklistData: payload => {
      return api.post(URIS.CHECK_LIST, payload)
    },

    updateChecklistFeedbackData: payload => {
      return api.post(URIS.CHECK_LIST_FEEDBACK, payload)
    },

    updateOrderStatusData: payload => {
      return api.post(URIS.UPDATE_ORDER_STATUS, payload)
    },

    updateOrderStatusConfirmData: payload => {
      return api.post(URIS.UPDATE_ORDER_STATUS_CONFIRM, payload)
    },

    fetchCustomerFeedbackData: payload => {
      return api.post(URIS.CUSTOMER_FEEDBACK, payload)
    },

    startLocationTracking: payload => {
      return api.post(URIS.LOCATION_TRACKING_START, payload)
    },

    sendLocationTrackingData: payload => {
      return api.post(URIS.LOCATION_TRACKING_SEND, payload)
    },

    fetchMessageBoardListData: payload => {
      return api.post(URIS.MESSAGE_BOARD_LIST, payload)
    },

    fetchMessageBoardData: payload => {
      return api.post(URIS.MESSAGE_BOARD, payload)
    },

    updateMessageBoardData: payload => {
      return api.post(URIS.MESSAGE_BOARD_UPDATE, payload)
    },

    updateCustomerLocationCoordinatesData: payload => {
      return api.post(URIS.UPLOAD_CUSTOMER_LOCATION, payload)
    },

    uploadMeasurementImages: payload => {
      return api.post(URIS.UPLOAD_MEASUREMENT_IMAGES, payload)
    }
  }
}

export default { createApiClient }
