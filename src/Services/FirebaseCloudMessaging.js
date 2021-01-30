import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { useAsyncStorage } from '@react-native-community/async-storage'

import { FCM_TOKEN_STORAGE_NAME } from '../Constants'
import NavigationService from '../Navigation'

const NOTIFICATION_DATA = {
  message: null,
  notificationType: null,
  title: null,
  body: null,
  orderId: null
}

const NOTIFICATION_INITIAL_STATE = { isVisible: false, data: NOTIFICATION_DATA }

const useFirebaseCloudMessaging = () => {
  // const { getItem: getFcmToken, setItem: saveFcmToken } = useAsyncStorage(FCM_TOKEN_STORAGE_NAME)

  const [fcmToken, setFcmToken] = React.useState(null)
  const [inAppNotification, setInAppNotification] = React.useState(NOTIFICATION_INITIAL_STATE)

  const init = async () => {
    const token = await getFcmToken()

    // console.log('firebaseCloudMessaging', token)
    if (!token) {
      // Get the device token
      messaging()
        .getToken()
        .then(token => {
          if (token) {
            setFcmToken(token)
            // saveFcmToken(token)
          }
        })
    }
  }

  const getFcmToken = async () => {
    return messaging().getToken()
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      // console.log('Authorization status:', authStatus)
    }
  }

  const hideInAppNotificationModal = () => {
    setInAppNotification(NOTIFICATION_INITIAL_STATE)
  }

  useEffect(() => {
    requestUserPermission()
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      setFcmToken(token)
    })
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { data } = remoteMessage

      setInAppNotification({
        isVisible: true,
        data
      })
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      const { notificationType, orderId } = remoteMessage.data

      setTimeout(() => {
        NavigationService.navigate(notificationType, { orderId })
      }, 1000)
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const { notificationType, orderId } = remoteMessage.data

          setTimeout(() => {
            NavigationService.navigate(notificationType, { orderId })
          }, 1000)
        }
      })
  }, [])

  return {
    fcmToken,
    init,
    getFcmToken,
    requestUserPermission,
    inAppNotification,
    hideInAppNotificationModal
  }
}

export default useFirebaseCloudMessaging
