import React from 'react'

import { View, Text, Avatar, Ratings, Icon } from '.'
import COLORS from '../Constants/Colors'

const CustomerProfileMini = ({ data, index }) => {
  const { customerName, customerAddress, customerPhoto } = data

  return (
    <View flex row centerV>
      <View centerV marginR-15>
        <Avatar size={60} source={{ uri: customerPhoto }} />
      </View>
      <View centerV>
        <View>
          <Text body>{customerName}</Text>
        </View>
        <View row left centerV marginT-4>
          <View marginR-6 center width={12}>
            <Icon type='Fontisto' name='map-marker-alt' size={10} color={COLORS.grey500} />
          </View>
          <View centerV>
            <Text caption2>{customerAddress}</Text>
          </View>
        </View>
        {/* <View row centerV>
          <Ratings imageSize={13} startingValue={item.rating} />
          <Text bold footnote style={{ marginLeft: 8 }}>{item.rating}</Text>
          <Text bold footnote style={{ marginLeft: 8 }}>{item.totalRatings} Ratings</Text>
        </View> */}
      </View>
    </View>
  )
}

export default CustomerProfileMini
