import { action, thunk } from 'easy-peasy'

import BaseModel from './Base'
import { NETWORK_STATUS } from '../../Constants'
import showToast from '../../Components/Toast'

export default {
  ...BaseModel(),

  isSuccess: false,

  signUpUser: thunk(async (actions, payload, { getState, dispatch, injections: { api } }) => {
    actions.updateNetworkStatus(NETWORK_STATUS.FETCHING)

    const { name, email, mobile, password, callingCode, userType } = payload

    const response = await api.signUpUser({
      name,
      callingCode,
      mobile,
      password,
      email,
      userType
    })

    if (!response.ok) {
      actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
      actions.setError()
    } else {
      const { result, message } = response.data

      if (result === 0) {
        actions.updateNetworkStatus(NETWORK_STATUS.FAILED)
        actions.setError()
        showToast(message, 'error')
      } else {
        actions.updateNetworkStatus(NETWORK_STATUS.SUCCESS)
        // actions.registered()
        showToast(message, 'success')

        dispatch.authN.loginUser({ mobile, password, callingCode })
      }
    }
  }),

  registered: action((state) => {
    state.isSuccess = true
  })
}
