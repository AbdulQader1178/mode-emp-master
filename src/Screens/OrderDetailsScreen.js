import React, { useEffect, useCallback, useState, useRef } from 'react'
import { ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { Button, Divider, FloatingActionButton, Icon, Input, Modal, Text, View } from '../Components'
import {
  Screen,
  OrderDetail,
  MediaList,
  Header,
  OrderDetailsSkeletonContent
} from '../Domain'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import viewStyles from '../Styles/ViewStyles'
import { Routes } from '../Navigation'
import { NETWORK_STATUS, ASSIGNMENT_STATUS, EMPLOYEE_TYPE } from '../Constants'
import COLORS from '../Constants/Colors'

const OrderDetailsScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const { orderId } = route.params || { orderId: null }

  const {
    setOrderId,
    fetch,
    update,
    updateConfirm
  } = useStoreActions(actions => ({ ...actions.orderDetails }))

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))
  const {
    networkStatus,
    model
  } = useStoreState(state => ({ ...state.orderDetails }))

  const [refreshing, setRefreshing] = useState(false)
  const [isChangeStatusButtonVisible, setIsChangeStatusButtonVisible] = useState(false)
  const [otp, setOtp] = useState(null)
  const [isLocationTrackingButtonVisible, setIsLocationTrackingButtonVisible] = useState(false)
  const [isPartiallyCompleted, setIsPartiallyCompleted] = useState(false)

  const confirmModalRef = useRef()
  const orderCompletedConfirmModalRef = useRef()

  useEffect(() => {
    fetch({ orderId })
    // setOrderId(orderId)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch().then(() => setRefreshing(false))
  }, [])

  const { orderNumber, images, stageId, stageText, messagesUnreadCount } = model

  const getConfirmationText = () => {
    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id) {
      if (
        stageId === ASSIGNMENT_STATUS.DELIVERY_CHECK_LIST_VERIFIED.id ||
        stageId === ASSIGNMENT_STATUS.DELIVERY_ACCEPTED.id
      ) {
        return t('changeStatusToOutForDelivery')
      }

      if (stageId === ASSIGNMENT_STATUS.DELIVERY_IN_TRANSIT.id) {
        return t('changeStatusToDelivered')
      }
    }

    if (userType === EMPLOYEE_TYPE.FITTING_PERSON.id) {
      if (stageId === ASSIGNMENT_STATUS.FITTING_CHECK_LIST_VERIFIED.id) {
        return t('changeStatusToCompleted')
      }
    }
  }

  const onChangeStatus = () => {
    let status = ''

    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id) {
      if (
        stageId === ASSIGNMENT_STATUS.DELIVERY_CHECK_LIST_VERIFIED.id ||
        stageId === ASSIGNMENT_STATUS.DELIVERY_ACCEPTED.id
      ) {
        status = 'intransit'
      } else if (stageId === ASSIGNMENT_STATUS.DELIVERY_IN_TRANSIT.id) {
        status = 'completed'
      }
    }

    if (userType === EMPLOYEE_TYPE.FITTING_PERSON.id) {
      if (stageId === ASSIGNMENT_STATUS.FITTING_CHECK_LIST_VERIFIED.id) {
        if (isPartiallyCompleted) {
          status = 'partially_completed'
        } else {
          status = 'completed'
        }
      }
    }

    confirmModalRef.current.hide()

    update({ status })
      .then(() => {
        if (status === 'intransit') {
          navigation.goBack()
        } else {
          orderCompletedConfirmModalRef.current.show()
        }
      })
  }

  const onSubmitOtp = () => {
    orderCompletedConfirmModalRef.current.hide()
    updateConfirm({ status: 'completed', otp })
      .then(() => {
        navigation.goBack()
      })
  }

  const ChangeStatusButton = () => {
    return (
      <View row style={viewStyles.floatingBottomActionBar}>
        <View flex>
          <Button
            label={t('changeStatus')}
            onPress={() => confirmModalRef.current.show()}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
          />
        </View>
      </View>
    )
  }

  const renderChangeStatusButton = () => {
    if (!isChangeStatusButtonVisible) {
      return <></>
    }

    return <ChangeStatusButton />
  }

  const renderOtpInput = () => {
    return (
      <Input
        autoFocusOnLoad
        onChangeText={(code) => setOtp(code)}
        keyboardType='phone-pad'
        returnKeyType='done'
        style={{ fontSize: 32 }}
      />
    )
  }

  useEffect(() => {
    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id) {
      if (
        stageId === ASSIGNMENT_STATUS.DELIVERY_CHECK_LIST_VERIFIED.id ||
        stageId === ASSIGNMENT_STATUS.DELIVERY_ACCEPTED.id ||
        stageId === ASSIGNMENT_STATUS.DELIVERY_IN_TRANSIT.id
      ) {
        setIsChangeStatusButtonVisible(true)
      }
      if (stageId === ASSIGNMENT_STATUS.DELIVERY_IN_TRANSIT.id) {
        setIsLocationTrackingButtonVisible(true)
      }
    }

    if (userType === EMPLOYEE_TYPE.FITTING_PERSON.id) {
      if (stageId === ASSIGNMENT_STATUS.FITTING_CHECK_LIST_VERIFIED.id) {
        setIsChangeStatusButtonVisible(true)
        setIsLocationTrackingButtonVisible(true)
      }
    }
  }, [userType, stageId])

  return (
    <Screen
      isLoading={networkStatus === NETWORK_STATUS.FETCHING && orderId !== model.orderId}
      SkeletonComponent={OrderDetailsSkeletonContent}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          title={`${t('orderNumber')} ${orderNumber || ''}`}
          subtitle={stageText}
        />
        {userType !== EMPLOYEE_TYPE.MEASUREMENT_PERSON.id && (
          <View marginT-32>
            <MediaList data={images} />
          </View>
        )}
        <View marginT-32>
          <OrderDetail data={model} userType={userType} {...route.params} />
        </View>
      </ScrollView>
      {renderChangeStatusButton()}
      {userType !== EMPLOYEE_TYPE.SALES_PERSON.id && isLocationTrackingButtonVisible && (
        <FloatingActionButton
          iconType='Entypo'
          icon='compass'
          onPress={() => navigation.navigate(Routes.LOCATION_TRACKING_SCREEN)}
          style={isChangeStatusButtonVisible ? styles.trackingFloatingActionButton : null}
        />
      )}
      {userType === EMPLOYEE_TYPE.SALES_PERSON.id && (
        <FloatingActionButton
          icon='message1'
          showDot={messagesUnreadCount && messagesUnreadCount > 0}
          onPress={() => navigation.navigate(Routes.MESSAGING_SCREEN, { orderId })}
        />
      )}
      <Modal
        ref={confirmModalRef}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <View flex marginT-8>
          <View flex padding-16>
            <Text body>{getConfirmationText()}</Text>
            {userType === EMPLOYEE_TYPE.FITTING_PERSON.id && (
              <View marginT-8>
                <TouchableOpacity
                  onPress={() => setIsPartiallyCompleted(state => !state)}
                >
                  <View paddingV-4 row>
                    <Icon
                      type='MaterialCommunityIcons'
                      name={isPartiallyCompleted
                        ? 'check-circle'
                        : 'checkbox-blank-circle-outline'}
                      color={colors.primary}
                    />
                    <Divider small vertical />
                    <Text subhead style={{ color: COLORS.grey400 }}>{t('partiallyCompleted')} </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Button
            label={t('confirm')}
            onPress={onChangeStatus}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
          />
        </View>
      </Modal>
      <Modal
        ref={orderCompletedConfirmModalRef}
        style={styles.modalSubmitOtp}
        contentContainerStyle={styles.modalContentSubmitOtp}
        onBackButtonPress={() => null}
        onBackdropPress={() => null}
      >
        <View flex marginT-16>
          <View flex paddingH-16>
            <Text subhead>{t('enterOtpToCompleteJob')}</Text>
            <Divider />
            {renderOtpInput()}
            <View center marginT-16>
              <Button
                label={t('dismiss')}
                small
                link
                onPress={() => orderCompletedConfirmModalRef.current.hide()}
              />
            </View>
          </View>
          <Button
            label={t('confirm')}
            onPress={onSubmitOtp}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
          />
        </View>
      </Modal>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80
  },
  trackingFloatingActionButton: {
    bottom: 80
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 200
  },
  modalSubmitOtp: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContentSubmitOtp: {
    height: 260
  }
})

export default OrderDetailsScreen
