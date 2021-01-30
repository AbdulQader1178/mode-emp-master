import React from 'react'
import { StyleSheet } from 'react-native'
import VideoPlayer from 'react-native-true-sight'

import { View } from '../Components'
import { Header, Screen } from '../Domain'

const VideoPlayerScreen = ({ route }) => {
  const videoUrl = route.params.url

  return (
    <Screen>
      <View flex>
        <VideoPlayer source={{ uri: videoUrl }} />
      </View>
      <Header
        containerStyle={styles.header}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})

export default VideoPlayerScreen
