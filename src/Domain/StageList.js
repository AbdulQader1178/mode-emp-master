import React, { } from 'react'
import { FlatList } from 'react-native'

import StageListItem from './StageListItem'

const StageList = ({ data, horizontal = true }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <StageListItem
          data={item}
          index={index}
          isCompleted={item.isCompleted}
          isCurrent={item.isCurrent}
          horizontal={horizontal}
        />
      )}
      keyExtractor={(_item, index) => index.toString()}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontal && { alignItems: 'center' }}
    />
  )
}

export default StageList
