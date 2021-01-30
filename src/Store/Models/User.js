import { action } from 'easy-peasy'

import BaseModel from './Base'

export default {
  ...BaseModel(),

  userId: null,
  userType: null,
  model: {
    userId: null,
    userType: null,
    name: null,
    mobile: null,
    callingCode: null,
    email: null,
    userCode: null,
    designation: null,
    address: null,
    birthDate: null,
    image: null
  },

  setUserId: action((state, payload) => {
    state.userId = payload
  }),

  setUserType: action((state, payload) => {
    state.userType = payload
  }),

  setUserDetails: action((state, payload) => {
    if (payload) {
      state.model = payload
    }
  })
}
