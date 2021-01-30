import React from 'react'

import { Shimmer, View } from '../Components'

const OrderDetailsSkeletonContent = () => {
  return (
    <View flex paddingV-32 paddingH-16>
      <View marginB-32 marginT-16 row>
        <Shimmer height={30} width={40} br100 />
        <View width={20} />
        <View>
          <Shimmer height={20} width={120} />
          <View height={10} />
          <Shimmer height={10} width={80} />
        </View>
      </View>
      <View marginB-32 row>
        <Shimmer height={100} width={160} br20 />
        <View width={20} />
        <Shimmer height={100} width={160} br20 />
      </View>
      <View marginB-32 row spread>
        <View>
          <Shimmer height={10} width={80} />
          <View height={4} />
          <Shimmer height={20} width={40} />
        </View>
        <View>
          <Shimmer height={10} width={80} />
          <View height={4} />
          <Shimmer height={20} width={40} />
        </View>
      </View>
      <View centerV row marginB-32>
        <Shimmer height={40} width={40} br100 />
        <View width={20} />
        <Shimmer height={20} width={160} />
      </View>
      <View centerV row marginB-32>
        <Shimmer height={40} width={40} br100 />
        <View width={20} />
        <Shimmer height={20} width={160} />
      </View>
      <View centerV row marginB-32>
        <Shimmer height={40} width={40} br100 />
        <View width={20} />
        <Shimmer height={20} width={160} />
      </View>
      <View centerV row marginV-32>
        <Shimmer height={30} width={30} br100 />
        <View width={30} />
        <View>
          <Shimmer height={20} width={120} />
          <View height={10} />
          <Shimmer height={10} width={40} />
        </View>
      </View>
      <View centerV row marginV-32>
        <Shimmer height={30} width={30} br100 />
        <View width={30} />
        <View>
          <Shimmer height={20} width={120} />
          <View height={10} />
          <Shimmer height={10} width={40} />
        </View>
      </View>
      <View centerV row marginV-32>
        <Shimmer height={30} width={30} br100 />
        <View width={30} />
        <View>
          <Shimmer height={20} width={120} />
          <View height={10} />
          <Shimmer height={10} width={40} />
        </View>
      </View>
    </View>
  )
}

export default React.memo(OrderDetailsSkeletonContent)
