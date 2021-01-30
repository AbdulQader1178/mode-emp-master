import React from 'react'

import { Shimmer, View } from '../Components'

const FeedbackSkeletonContent = () => {
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
      <View marginV-32>
        <Shimmer height={20} width={160} />
        <View height={10} />
        <Shimmer height={40} width={120} />
      </View>
      <View marginV-32>
        <Shimmer height={20} width={160} />
        <View height={10} />
        <Shimmer height={40} width={120} />
      </View>
      <View marginV-32>
        <Shimmer height={20} width={160} />
        <View height={10} />
        <Shimmer height={40} width={120} />
      </View>
    </View>
  )
}

export default React.memo(FeedbackSkeletonContent)
