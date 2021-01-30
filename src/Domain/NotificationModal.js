import React, { useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useStoreActions } from 'easy-peasy'

import { View, Modal, Text, Divider, Button } from '../Components'
import useTranslation from '../i18n'
import useFirebaseCloudMessaging from '../Services/FirebaseCloudMessaging'
import NavigationService from '../Navigation'

export const NotificationModal = () => {
  const { t } = useTranslation()

  const {
    inAppNotification,
    hideInAppNotificationModal
  } = useFirebaseCloudMessaging()
  console.log('inAppNotification', inAppNotification)
  const {
    setOrderId
  } = useStoreActions(actions => ({ ...actions.orderDetails }))

  const modalRef = useRef()

  const {
    // message,
    notificationType, // contains the route to navigate to
    title,
    body,
    orderId
  } = inAppNotification.data

  const onPressOk = () => {
    modalRef.current.hide()
    setOrderId(orderId)
    NavigationService.navigate(notificationType, { orderId })
  }

  const onModalHide = () => {
    hideInAppNotificationModal()
  }

  useEffect(() => {
    if (inAppNotification.isVisible) {
      modalRef.current.show()
    } else {
      modalRef.current.hide()
    }
  }, [inAppNotification.isVisible])

  return (
    <Modal
      ref={modalRef}
      style={styles.modal}
      contentContainerStyle={styles.modalContent}
      onModalHide={onModalHide}
    >
      <View flex marginT-32>
        <View flex paddingH-32>
          <Text body>{title}</Text>
          <Divider small />
          <Text subhead>{body}</Text>
        </View>
        <Button
          label={t('takeMeThere')}
          onPress={onPressOk}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 240
  }
})

export default NotificationModal
