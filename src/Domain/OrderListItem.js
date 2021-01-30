import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useStoreActions, useStoreState } from 'easy-peasy'
import moment from 'moment'

import {
  View,
  Text,
  ShadowView,
  ProfileImage,
  Divider,
  Icon,
  TouchableRipple
} from '../Components'
import { Routes } from '../Navigation'
import Spacings from '../DesignSystem/Spacings'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import { EMPLOYEE_TYPE } from '../Constants'
import check from 'check-types'

const OrderListItem = ({ data, onRefresh }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))

  const { setOrderId } = useStoreActions((actions) => ({
    ...actions.orderDetails
  }))

  const {
    orderId,
    customerName,
    address,
    customerImage,
    name,
    orderNumber,
    scheduleDateTime,
    stageId,
    stageText,
    color,
    messagesUnreadCount
    // isCompleted,
    // isCurrent,
  } = data

  const onPressViewDetails = () => {
    // setOrderId(orderId)
    navigation.navigate(Routes.ORDER_DETAILS_SCREEN, { orderId })
  }

  const renderMessagesUnreadCount = () => {
    if (userType !== EMPLOYEE_TYPE.SALES_PERSON.id) {
      return <></>
    }

    if (messagesUnreadCount && messagesUnreadCount > 0) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.MESSAGING_SCREEN, { orderId })}
          style={[styles.messageIndicator, { borderColor: colors.primary }]}
        >
          <Icon type='Ionicons' name='ios-chatbox' color={colors.primary} size={30} style={styles.messageIndicatorIcon} />
          <Text caption1 style={{ color: colors.text }}>{messagesUnreadCount}</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <>
      <View
        margin-8
        paddingH-16
      >
        <ShadowView
          style={{ backgroundColor: colors.surface }}
        >
          <TouchableRipple
            onPress={onPressViewDetails}
          >
            <>
              <View height={3} style={{ backgroundColor: color }} />
              <View centerV padding-16>
                <View>
                  <View centerV row>
                    <ProfileImage source={customerImage} size={40} />
                    <Divider vertical />
                    <View>
                      <View marginB-4>
                        <Text body>{customerName}</Text>
                      </View>
                      {check.nonEmptyString(address) && (
                        <View centerV row>
                          <Icon
                            type='SimpleLineIcons'
                            name='location-pin'
                            size={12}
                            color={colors.text}
                          />
                          <Divider vertical small />
                          <Text caption1>{address}</Text>
                        </View>)}
                    </View>
                  </View>
                  <Divider />
                </View>
                <View bottom row spread>
                  <View>
                    <Text callout>
                      {`${t('orderNumber')} ${orderNumber}`}
                    </Text>
                    <Text caption2>
                      {moment(scheduleDateTime).format('dddd, DD MMMM YYYY')}
                    </Text>
                  </View>
                  <View row>
                    <Text headline bold>
                      {stageText}
                    </Text>
                    <Divider vertical />
                    <Icon type='Entypo' name='chevron-thin-right' size={16} color={colors.text} />
                  </View>
                </View>
              </View>
            </>
          </TouchableRipple>
          {renderMessagesUnreadCount()}
        </ShadowView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  messageIndicator: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    top: Spacings.gridGutter,
    right: Spacings.gridGutter,
    width: 30,
    zIndex: 1
  },
  messageIndicatorIcon: {
    position: 'absolute',
    top: 3
  }
})

export default OrderListItem
