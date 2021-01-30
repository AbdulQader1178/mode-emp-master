import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Text, CustomerProfileMini, TouchableRipple } from '.'
import Spacings from '../DesignSystem/Spacings'
import COLORS from '../Constants/Colors'
import elevationShadowStyle from '../Utils/ShadowStyle'

const StoreOrderListItem = ({ data, index, onPress }) => {
  const { name, log, status, statusText } = data

  return (
    <TouchableRipple
      onPress={() => onPress(data)}
      style={[
        styles.item
      ]}
    >
      <View flex>
        <View row centerV spread>
          <View>
            <Text subhead semibold>{name}</Text>
            <Text footnote style={{ color: COLORS.grey400 }}>{log}</Text>
          </View>
          <View centerV style={styles.status}>
            <Text caption1 style={{ color: COLORS.white }}>{statusText}</Text>
          </View>
        </View>
        <View marginT-10>
          <CustomerProfileMini data={data} />
        </View>
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 110,
    marginHorizontal: 16
  },
  tabbar: {
    marginVertical: 10,
    backgroundColor: COLORS.backgroundColor
  },
  item: {
    padding: Spacings.gridGutter,
    marginVertical: Spacings.gridGutter / 2,
    backgroundColor: COLORS.backgroundColor,
    ...elevationShadowStyle({ elevation: 2 })
  },
  status: {
    backgroundColor: COLORS.grey600,
    borderRadius: 4,
    height: 20,
    paddingHorizontal: 10
  }
})

export default StoreOrderListItem
