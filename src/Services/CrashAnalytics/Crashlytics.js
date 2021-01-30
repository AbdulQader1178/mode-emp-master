import React from 'react'
import crashlytics from '@react-native-firebase/crashlytics'

const useCrashlytics = () => {
  const log = (data) => {
    crashlytics().log(data)
  }

  const onSignIn = (userDetails) => {
    const {
      userId,
      callingCode,
      mobile,
      email
    } = userDetails
    try {
      crashlytics().setUserId(userId)
      crashlytics().setAttributes({
        mobile: `+${callingCode}-${mobile}`,
        email: email,
        appName: 'CUSTOMER'
      })
    } catch (error) {
      crashlytics().recordError(error)
    }
  }

  return {
    log,
    onSignIn
  }
}
export default useCrashlytics
