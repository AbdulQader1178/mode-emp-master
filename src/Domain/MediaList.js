import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import hexToRgba from 'hex-to-rgba'

import { View, Image, ModalImageViewer, TouchableRipple, ShadowView, Icon } from '../Components'
import Spacings from '../DesignSystem/Spacings'
import { Routes } from '../Navigation'
import COLORS from '../Constants/Colors'
import check from 'check-types'

const PLAY_ICON_SIZE = 40

const isVideo = (uri) => {
  const ext = uri.split('.').pop()
  return ext === 'avi' || ext === 'mp4' || ext === 'mkv'
}

const MediaList = ({
  data = [],
  horizontal = true,
  size,
  isFlatList = true
}) => {
  const [_data, setData] = useState([])
  const [isImageViewerModalVisible, setIsImageViewerModalVisible] = useState(false)
  const [imageViewerIndex, setImageViewerIndex] = useState(0)

  const videoItemCount = _data.filter(item => isVideo(item.url)).length

  const thumbs = _data
    .filter(item => !isVideo(item.url))
    .map(({ url }) => ({
      uri: url,
      freeHeight: true
    }))

  const onPressMediaItem = (index) => {
    setImageViewerIndex(index - videoItemCount)
    setIsImageViewerModalVisible(true)
  }

  const renderImageViewer = () => {
    return (
      <ModalImageViewer
        visible={isImageViewerModalVisible}
        images={thumbs}
        imageIndex={imageViewerIndex}
        onRequestClose={() => setIsImageViewerModalVisible(false)}
        swipeToCloseEnabled={false}
      />
    )
  }

  React.useEffect(() => {
    if (data.every(item => check.string(item))) {
      setData(data.map(item => ({ url: item, thumbUrl: item })))
    }
  }, [data])

  if (!isFlatList) {
    return (
      <>
        {_data.map((item, index) => (
          <MediaListItem
            data={item}
            index={index}
            onPressItem={onPressMediaItem}
            size={size}
            key={index}
          />
        ))}
        {renderImageViewer()}
      </>
    )
  }

  return (
    <>
      <FlatList
        data={_data}
        renderItem={({ item, index }) => (
          <MediaListItem
            data={item}
            index={index}
            onPressItem={onPressMediaItem}
            size={size}
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
      />
      {renderImageViewer()}
    </>
  )
}

const MediaListItem = React.memo(({ data, index, size, onPressItem = () => { } }) => {
  const navigation = useNavigation()

  const { thumbUrl, url } = data

  if (isVideo(url)) {
    return (
      <View marginB-16 key={index}>
        <ShadowView style={styles.itemContainer}>
          <TouchableRipple
            onPress={() => navigation.navigate(Routes.VIDEO_PLAYER_SCREEN, {
              url: url
            })}
          >
            <>
              <Image
                source={{ uri: thumbUrl }}
                style={[
                  styles.item,
                  size === 'small' && styles.smallItem,
                  size === 'large' && styles.largeItem
                ]}
              />
              <Icon
                name='play'
                size={PLAY_ICON_SIZE}
                color={hexToRgba(COLORS.white, 0.6)}
                style={styles.playIcon}
              />
            </>
          </TouchableRipple>
        </ShadowView>
      </View>
    )
  }

  return (
    <View marginB-16 key={index}>
      <ShadowView style={styles.itemContainer}>
        <TouchableRipple
          onPress={() => onPressItem(index)}
        >
          <Image
            source={{ uri: thumbUrl }}
            style={[
              styles.item,
              size === 'small' && styles.smallItem,
              size === 'large' && styles.largeItem
            ]}
          />
        </TouchableRipple>
      </ShadowView>
    </View>
  )
})

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 140,
    height: 90,
    marginLeft: Spacings.gridGutter,
    alignItems: 'center',
    borderRadius: 8
  },
  smallItem: {
    width: 90,
    height: 60,
    marginLeft: Spacings.gridGutter,
    borderRadius: 4
  },
  largeItem: {
    width: 180,
    height: 120,
    marginLeft: Spacings.gridGutter,
    borderRadius: 8
  },
  playIcon: {
    marginLeft: -PLAY_ICON_SIZE / 4,
    marginTop: -PLAY_ICON_SIZE / 2,
    position: 'absolute',
    left: '50%',
    top: '50%'
  }
})

export default React.memo(MediaList)
