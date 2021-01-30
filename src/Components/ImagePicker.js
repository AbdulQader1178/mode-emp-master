import React, { useReducer, useEffect, useRef } from 'react'
import { StyleSheet, ScrollView, Image, TouchableOpacity, I18nManager } from 'react-native'
import { default as RNImageCropPicker } from 'react-native-image-crop-picker'
import check from 'check-types'
import isUrl from 'is-url'

import { View, Icon, TouchableRipple, Menu, MenuItem } from '.'
import ModalImageViewer from './ModalImageViewer'
import useTheme from '../DesignSystem/Context'
import { urlToBase64 } from '../Utils/Utils'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import elevationShadowStyle from '../Utils/ShadowStyle'

const IMAGE_PICKER_SETTINGS = {
  mediaType: 'any',
  includeBase64: true,
  cropping: true,
  compressImageMaxWidth: 1024,
  compressImageQuality: 0.8
}

const ImagePicker = ({
  initialItems,
  canPickMultipleItemsFromGallery = true,
  mediaType = 'any',
  maximumNumberOfItems = 5,
  onChange = () => { },
  editable = true
}) => {
  const { colors, theme } = useTheme()

  const [state, dispatch] = useReducer(reducer, {
    items: [],
    imageViewerItems: [],
    isImageViewerModalVisible: false,
    imageViewerIndex: 0
  })
  const menuRef = useRef()

  const { items } = state

  const settings = {
    ...IMAGE_PICKER_SETTINGS,
    mediaType,
    multiple: canPickMultipleItemsFromGallery
  }

  const onPressItem = (index) => {
    dispatch({
      type: 'setImageViewerIndex',
      payload: index
    })
    dispatch({
      type: 'setIsImageViewerModalVisible',
      payload: true
    })
  }

  const onPickSuccess = (media) => {
    menuRef.current.hide()

    if (items.length === maximumNumberOfItems) {
      return
    }

    dispatch({
      type: 'add',
      payload: (check.not.array(media) ? [media] : media)
        .map(item => ({
          uri: `data:${item.mime};base64,${item.data}`,
          path: item.path
        }))
        .slice(0, maximumNumberOfItems - items.length)
    })
  }

  const openGallery = () => {
    RNImageCropPicker.openPicker(settings).then(media => onPickSuccess(media))
  }

  const openCamera = () => {
    RNImageCropPicker.openCamera(settings).then(media => onPickSuccess(media))
  }

  const onRemove = (index) => {
    dispatch({ type: 'remove', payload: index })
  }

  const PickerTrigger = () => (
    <Menu
      ref={menuRef}
      button={(
        <TouchableRipple
          onPress={() => menuRef.current.show()}
          style={[
            styles.item,
            styles.firstItem,
            { backgroundColor: colors.surface }
          ]}
        >
          <Icon
            name='plus'
            color={theme === 'light' ? COLORS.grey400 : colors.text}
          />
        </TouchableRipple>
      )}
    >
      <MenuItem onPress={openGallery}>Gallery</MenuItem>
      <MenuItem onPress={openCamera}>Camera</MenuItem>
    </Menu>
  )

  // This snippet converts image urls to data uris
  useEffect(() => {
    if (check.nonEmptyArray(initialItems) && initialItems.every(url => isUrl(url))) {
      try {
        const promises = initialItems.map(url => urlToBase64(url))

        Promise.all(promises)
          .then((imageDataUris) => {
            dispatch({
              type: 'init',
              payload: imageDataUris.map(uri => ({ uri }))
            })
          })
      } catch (error) {
        console.log(error)
      }
    }
  }, [initialItems])

  useEffect(() => {
    const images = items
      .map(item => ({
        uri: item.uri,
        freeHeight: true
      }))

    dispatch({
      type: 'setImageViewerItems',
      payload: images
    })

    onChange(items)
  }, [items])

  return (
    <>
      <View style={styles.root}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
        >
          {editable && items.length < maximumNumberOfItems && <PickerTrigger />}
          {items.length > 0 && items.map(({ uri }, index) => (
            <View
              style={[
                styles.item,
                { backgroundColor: colors.surface },
                items.length === maximumNumberOfItems &&
                index === 0 && styles.firstItem,
                !editable && styles.firstItem
              ]}
              key={index}
            >
              <TouchableRipple
                style={styles.thumbnailContainer}
                onPress={() => onPressItem(index)}
              >
                <Image
                  source={{ uri }}
                  resizeMode='cover'
                  style={styles.thumbnail}
                />
              </TouchableRipple>
              {editable && (
                <TouchableOpacity
                  onPress={() => onRemove(index)}
                  style={styles.removeThumbnail}
                >
                  <Icon
                    name='close'
                    size={12}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <ModalImageViewer
        visible={state.isImageViewerModalVisible}
        images={state.imageViewerItems}
        imageIndex={state.imageViewerIndex}
        onRequestClose={() => {
          dispatch({
            type: 'setIsImageViewerModalVisible',
            payload: false
          })
        }}
      />
    </>
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        items: action.payload
      }
    case 'add':
      return {
        ...state,
        items: [
          ...state.items,
          ...action.payload
        ]
      }
    case 'remove':
      return {
        ...state,
        items: state.items.filter(
          (item, index) => index !== action.payload
        )
      }
    case 'setImageViewerItems':
      return {
        ...state,
        imageViewerItems: action.payload
      }
    case 'setImageViewerIndex':
      return {
        ...state,
        imageViewerIndex: action.payload
      }
    case 'setIsImageViewerModalVisible':
      return {
        ...state,
        isImageViewerModalVisible: action.payload
      }
    default:
      throw new Error()
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'relative'
  },
  item: {
    alignItems: 'center',
    borderRadius: 4,
    ...elevationShadowStyle({ elevation: 2 }),
    height: 80,
    justifyContent: 'center',
    margin: Spacings.gridGutter / 4,
    overflow: 'hidden',
    width: 80
  },
  firstItem: {
    marginLeft: Spacings.gridGutter
  },
  thumbnailContainer: {
    flex: 1,
    position: 'relative'
  },
  thumbnail: {
    height: 80,
    width: 80
  },
  removeThumbnail: {
    alignItems: 'center',
    borderRadius: 30,
    ...elevationShadowStyle({ elevation: 6 }),
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
    width: 20
  }
})

export default ImagePicker
