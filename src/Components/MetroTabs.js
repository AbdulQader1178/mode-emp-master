/**
 * @format
 * @flow
 */

import React, { useState, useRef } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const { width, height } = Dimensions.get('window')
const headerWidth = width / 1.7

const MetroTabs = ({ screens }) => {
  const [currentPage, setCurrentPage] = useState('1')
  const screenListRef = useRef()
  const headerListRef = useRef()

  const handleScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }) => {
    try {
      headerListRef.current.scrollToOffset({
        offset: (x * headerWidth) / width,
        animated: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  const viewabilityConfig = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  })

  const onViewableItemsChanged = useRef(info => {
    if (info.viewableItems.length === 1) {
      setCurrentPage(info.viewableItems[0].key)
      console.log('scrolling to ', info.viewableItems)
    }
  })

  const headerPress = item => {
    setCurrentPage(item.key)
    screenListRef.current.scrollToItem({ item: { key: item } })
  }

  return (
    <View style={{ paddingTop: 120 }}>
      <FlatList
        ref={screenListRef}
        horizontal
        snapToAlignment='center'
        decelerationRate={10}
        snapToInterval={width}
        data={screens}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container}>{item.screen}</View>
        )}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <FlatList
        ref={headerListRef}
        style={{ position: 'absolute', top: 0, right: 0 }}
        horizontal
        snapToAlignment='center'
        decelerationRate={10}
        snapToInterval={width}
        data={screens}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            // activeOpacity={1}
            onPress={() => headerPress(item)}
          >
            <Text
              style={{
                padding: 10,
                width: headerWidth,
                marginTop: 20,
                fontSize: 50,
                opacity: currentPage === item.key ? 1 : 0.4
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
    width
  }
})

export default MetroTabs
