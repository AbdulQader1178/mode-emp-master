import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import check from 'check-types'

import { View, Avatar, Icon } from '../Components'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import ImagePickerModal from './ImagePickerModal'

const ProfileImage = ({ source, size = 60, isEditable = false, onChange }) => {
  const { colors } = useTheme()

  const [imageUri, setImage] = useState(source)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const _onChange = (imageDataUri) => {
    setImage(imageDataUri)
    if (onChange) {
      onChange(imageDataUri)
    }
  }

  const Component = () => {
    return (
      <View
        center
        style={[
          styles.root,
          {
            borderRadius: size / 2,
            height: size,
            width: size
          }
        ]}
      >
        {check.assigned(imageUri) && check.nonEmptyString(imageUri)
          ? <Avatar size={size} source={{ uri: imageUri }} />
          : <Icon name='user' size={size / 2} color={COLORS.grey800} />}
        {isEditable && (
          <View
            center
            style={[
              styles.profileCameraIconContainer,
              {
                backgroundColor: colors.primary,
                borderColor: colors.background
              }
            ]}
          >
            <Icon name='camera' color={COLORS.white} />
          </View>
        )}
      </View>
    )
  }

  if (isEditable) {
    return (
      <>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={[
            styles.root,
            {
              borderRadius: size,
              height: size,
              width: size
            }
          ]}
        >
          <Component />
        </TouchableOpacity>
        <ImagePickerModal
          onPickImage={_onChange}
          isVisible={isModalVisible}
          onModalHide={() => setIsModalVisible(false)}
        />
      </>
    )
  }

  return <Component />
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.grey300,
    position: 'relative'
  },
  profileCameraIconContainer: {
    borderRadius: 50,
    borderWidth: 2,
    height: 40,
    padding: 5,
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 160,
    padding: Spacings.gridGutter
  },
  actionButton: {
    height: 90,
    width: 90
  }
})

export default ProfileImage
