import React from 'react'

import { Shimmer, View } from '../Components'

const OrderListSkeletonContent = () => {
  return (
    <View flex>
      <View height={30} />
      <Item />
      <Item />
      <Item />
      <Item />
    </View>
  )
}
const Item = () => {
  return (
    <View marginV-8 paddingH-16>
      <Shimmer height={5} />
      <View row padding-16>
        <Shimmer height={40} width={40} br100 />
        <View width={20} />
        <View>
          <Shimmer height={20} width={120} />
          <View height={10} />
          <Shimmer height={10} width={80} />
        </View>
      </View>
      <View padding-16 row spread>
        <Shimmer height={10} width={90} />
        <Shimmer height={20} width={140} />
      </View>
    </View>
  )
}

export default React.memo(OrderListSkeletonContent)
