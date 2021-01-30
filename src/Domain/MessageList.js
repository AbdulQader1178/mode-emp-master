import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import check from 'check-types'
import moment from 'moment'

import { NoData, Text, View } from '../Components'
import { MESSAGE_SENDER_TYPE } from '../Constants'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import COLORS from '../Constants/Colors'

const getMessageDateTimeFormatted = (dateTime) => {
  if (moment().isSame(moment(dateTime), 'day')) {
    return {
      day: null,
      time: moment(dateTime).format('HH:mm')
    }
  }

  return {
    day: moment(dateTime).format('DD/MM/YYYY'),
    time: moment(dateTime).format('HH:mm')
  }
}

const MessageList = ({
  data = [],
  ListHeaderComponent,
  ListFooterComponent,
  ...rest
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const renderSenderName = (senderType) => {
    let senderName = ''

    if (senderType === MESSAGE_SENDER_TYPE.SALES_PERSON.id) {
      senderName = t('you')
    } else if (senderType === MESSAGE_SENDER_TYPE.CUSTOMER.id) {
      senderName = t('customer')
    } else {
      senderName = t('support')
    }

    if (senderType !== MESSAGE_SENDER_TYPE.CUSTOMER.id) {
      return (
        <Text
          caption1
          style={{
            color: colors.primary
          }}
        >
          {senderName}
        </Text>
      )
    }

    return <Text caption1 style={{ color: COLORS.grey400 }}>{senderName}</Text>
  }

  const renderItem = ({ item, index }) => {
    const { senderType, text, createdAt } = item


    return (
      <List.Item
        title={renderSenderName(senderType)}
        description={text}
        right={() => (
          <View padding-8 right>
            <Text caption2>
              {getMessageDateTimeFormatted(createdAt).day}
            </Text>
            <Text caption2>
              {getMessageDateTimeFormatted(createdAt).time}
            </Text>
          </View>
        )}
        descriptionStyle={{ color: colors.text }}
      />
    )
  }

  if (check.emptyArray(data)) {
    return <NoData text={t('noMessagesYet')} />
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      inverted
      ListHeaderComponent={ListFooterComponent}
      ListFooterComponent={ListHeaderComponent}
      keyboardShouldPersistTaps='handled'
      {...rest}
    />
  )
}

export default MessageList
