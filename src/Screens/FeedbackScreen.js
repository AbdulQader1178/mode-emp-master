import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'

import {
  Screen,
  Header,
  FeedbackSkeletonContent
} from '../Domain'
import { View, Text, StarRating } from '../Components'
import useTranslation from '../i18n/index'
import { NETWORK_STATUS } from '../Constants'

const FeedbackScreen = ({ route }) => {
  const { t } = useTranslation()

  const { orderId } = route.params || { orderId: null }

  const {
    fetchCustomerFeedback
  } = useStoreActions(actions => ({ ...actions.orderDetails }))

  const {
    networkStatus,
    model,
    customerFeedback: { questions }
  } = useStoreState(state => ({ ...state.orderDetails }))

  const { orderNumber } = model

  useEffect(() => {
    fetchCustomerFeedback({ orderId })
  }, [])

  return (
    <Screen
      isLoading={networkStatus === NETWORK_STATUS.FETCHING && orderId !== model.orderId}
      SkeletonComponent={FeedbackSkeletonContent}
    >
      <ScrollView
        style={styles.container}
      >
        <Header title={`${t('orderNumber')} ${orderNumber || ''}`} subtitle={t('feedback')} />
        <View marginV-32>
          {questions.map((q, index) => (
            <View flex padding-16 key={index}>
              <View marginB-8>
                <Text body>{q.text}</Text>
              </View>
              <View left>
                <StarRating
                  rating={q.rating}
                  maxStars={5}
                  size={25}
                  showRating={false}
                  disabled
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = {
  container: {
    flex: 1,
    flexGrow: 1
  }
}

export default FeedbackScreen
