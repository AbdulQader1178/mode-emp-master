import React, { useCallback, useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { Button, Divider, View } from '../Components'
import {
  Screen,
  Header,
  MessageList,
  MessagingInputToolbar
} from '../Domain'
import useTranslation from '../i18n'
import useFirebaseCloudMessaging from '../Services/FirebaseCloudMessaging'
import { NETWORK_STATUS } from '../Constants'
import { BUTTON_SMALL_HEIGHT } from '../Components/Button'
import { Routes } from '../Navigation'

const MessagingScreen = ({ navigation, route }) => {
  const { t } = useTranslation()
  const {
    inAppNotification,
    hideInAppNotificationModal
  } = useFirebaseCloudMessaging()

  const { orderId } = route.params

  const {
    setOrderId,
    fetch,
    create
  } = useStoreActions(actions => ({ ...actions.messaging }))

  const {
    networkStatus,
    model: { orderNumber, messages }
  } = useStoreState(state => ({ ...state.messaging }))

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch().then(() => setRefreshing(false))
  }, [])

  const onSubmit = (text) => {
    create({ orderId, text })
  }

  useEffect(() => {
    setOrderId(orderId)
    fetch({ orderId })
  }, [])

  useEffect(() => {
    /*
      if a push notification arrives at the time when
      user is on the Messaging screen and if the orderId
      in the notification body matches the current orderId,
      then hide the modal and fetch the message list again
    */
    if (
      inAppNotification.isVisible &&
      inAppNotification.data.notificationType === Routes.MESSAGING_SCREEN &&
      inAppNotification.data.orderId === orderId
    ) {
      hideInAppNotificationModal()
      fetch({ orderId })
    }
  }, [inAppNotification])

  return (
    <Screen>
      <View flex paddingB-60>
        <Header
          title={t('message')}
          subtitle={`${t('orderNumber')} ${orderNumber || ''}`}
        />
        <MessageList
          data={messages}
          ListHeaderComponent={<Divider />}
          ListFooterComponent={(
            <View center padding-16>
              <Button
                label={t('getNewMessages')}
                onPress={onRefresh}
                outline
                small
                isLoading={refreshing}
                borderRadius={BUTTON_SMALL_HEIGHT}
              />
            </View>
          )}
        />
        <MessagingInputToolbar
          onSubmit={onSubmit}
          isSent={networkStatus === NETWORK_STATUS.SUCCESS}
          isLoading={networkStatus === NETWORK_STATUS.FETCHING}
        />
      </View>
    </Screen>
  )
}

export default MessagingScreen
