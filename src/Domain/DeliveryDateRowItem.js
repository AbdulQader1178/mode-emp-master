import React from 'react'
import moment from 'moment'

import { View, Text, Divider } from '../Components'
import useTranslation from '../i18n'
import { EMPLOYEE_TYPE } from '../Constants'

const DeliveryDateRowItem = ({ data, userType, hasBottomLineDivider = false }) => {
  const { t } = useTranslation()

  const {
    scheduleDateTime
  } = data

  if (userType === EMPLOYEE_TYPE.SALES_PERSON.id) {
    return <></>
  }

  if (userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id) {
    return <></>
  }

  return (
    <>
      <View marginB-32>
        <Text caption1>{t('scheduledDeliveryDate')}</Text>
        <Text body>
          {scheduleDateTime ?
            `${moment(scheduleDateTime).format('dddd, DD MMMM YYYY')}`
            : '-'}
        </Text>
      </View>
      {hasBottomLineDivider && <Divider line />}
    </>
  )
}

export default DeliveryDateRowItem
