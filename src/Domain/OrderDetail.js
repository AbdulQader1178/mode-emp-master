import React from 'react'

import { View } from '../Components'
import OrderDetailMiniRowItem from './OrderDetailMiniRowItem'
import CustomerProfileRowItem from './CustomerProfileRowItem'
import LocationRowItem from './LocationRowItem'
import DeliveryDateRowItem from './DeliveryDateRowItem'
import ChecklistRowItem from './ChecklistRowItem'
import FeedbackRowItem from './FeedbackRowItem'
import StageList from './StageList'
import ImageUploaderRowItem from './ImageUploaderRowItem'

const OrderDetail = ({ data, userType, ...rest }) => {
  const {
    stages
  } = data

  return (
    <>
      <View paddingH-16>
        <OrderDetailMiniRowItem data={data} userType={userType} />
        <DeliveryDateRowItem data={data} userType={userType} />
        <CustomerProfileRowItem data={data} />
        <LocationRowItem data={data} userType={userType} />
        <ChecklistRowItem data={data} userType={userType} {...rest} />
        <FeedbackRowItem userType={userType} {...rest} />
      </View>
      <ImageUploaderRowItem />
      <View marginT-32 marginB-64>
        <StageList
          data={stages}
          horizontal={false}
        />
      </View>
    </>
  )
}

export default OrderDetail
