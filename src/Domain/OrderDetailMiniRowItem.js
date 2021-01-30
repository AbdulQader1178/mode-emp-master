import React from 'react'

import { View, Text, Divider } from '../Components'
import useTranslation from '../i18n'
import { EMPLOYEE_TYPE } from '../Constants'

const OrderDetailMiniRowItem = ({ data, userType, hasBottomDivider = true }) => {
  const { t } = useTranslation()

  const {
    orderNumber,
    stageText
  } = data

  if (userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id) {
    return <></>
  }

  return (
    <>
      <View row spread>
        <View>
          <Text caption1>{t('orderNumber')}</Text>
          <Text body>{orderNumber}</Text>
        </View>
        <View right>
          <Text caption1>{t('status')}</Text>
          <Text body>{stageText}</Text>
        </View>
      </View>
      {hasBottomDivider && <Divider />}
    </>
  )
}

export default OrderDetailMiniRowItem
