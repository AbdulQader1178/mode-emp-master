import { Platform } from 'react-native'

export const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const isAndroid = Platform.OS === 'android'
export const isIos = !isAndroid

export const FCM_TOKEN_STORAGE_NAME = '@fcmToken'

export const APP_STATE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  AUTHENTICATING: 'AUTHENTICATING',
  UNKNOWN: 'UNKNOWN'
}
export const NETWORK_STATUS = {
  SUCCESS: 'SUCCESS',
  NOT_STARTED: 'NOT_STARTED',
  FETCHING: 'FETCHING',
  FAILED: 'FAILED'
}
export const LOCALES = {
  ENGLISH: { id: 1, name: 'en', label: 'ENGLISH' },
  ARABIC: { id: 2, name: 'ar', label: 'عربي' }
}

export const DEFAULT_COUNTRY_CALLING_CODE = '+966'

export const GENERAL_DAY_DISPLAY_FORMAT = 'DD MMM'
export const API_REQUEST_DATE_FORMAT = 'DD-MM-YYYY'
export const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD'
export const CALENDAR_INPUT_TIME_FORMAT = 'h:mma'

export const EMPLOYEE_TYPE = {
  DELIVERY_PERSON: { id: '1' },
  FITTING_PERSON: { id: '2' },
  SALES_PERSON: { id: '3' },
  MEASUREMENT_PERSON: { id: '4' }
}

export const MESSAGE_SENDER_TYPE = {
  CUSTOMER: { id: '1' },
  SALES_PERSON: { id: '3' }
}

export const ASSIGNMENT_TYPE_TAB_ITEMS = [
  {
    en: 'Today\'s',
    ar: 'اليوم'
  },
  {
    en: 'Upcoming',
    ar: 'القادمة'
  },
  {
    en: 'All',
    ar: 'الكل'
  }
]

export const ASSIGNMENT_STATUS = {
  DELIVERY_PERSON_ASSIGNED: {
    id: '8'
  },
  DELIVERY_CHECK_LIST_VERIFIED: {
    id: '9'
  },
  DELIVERY_ACCEPTED: {
    id: '10'
  },
  DELIVERY_IN_TRANSIT: {
    id: '11'
  },
  DELIVERY_PARTIALLY_COMPLETED: {
    id: '12'
  },
  DELIVERY_COMPLETED: {
    id: '13'
  },
  FITTING_PERSON_ASSIGNED: {
    id: '15'
  },
  FITTING_CHECK_LIST_VERIFIED: {
    id: '16'
  },
  FITTING_PARTIALLY_COMPLETED: {
    id: '17'
  },
  FITTING_COMPLETED: {
    id: '18'
  }
}
