import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native'

import { View, Icon } from '../Components'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import ImagePickerModal from './ImagePickerModal'

const CoverImage = ({ source, isEditable = true, onChange }) => {
  const { colors } = useTheme()

  const [imageUri, setImage] = useState(source)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const _onChange = (imageDataUri) => {
    setImage(imageDataUri)
    if (onChange) {
      onChange(imageDataUri)
    }
  }

  return (
    <>
      <View style={styles.root}>
        <ImageBackground
          source={{
            uri: imageUri
          }}
          style={styles.coverImage}
        >
          {isEditable && (
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.pickerRoot}>
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
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
      {isEditable && (
        <ImagePickerModal
          onPickImage={_onChange}
          isVisible={isModalVisible}
          onModalHide={() => setIsModalVisible(false)}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.grey200,
    marginBottom: 55,
    position: 'relative'
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width
  },
  pickerRoot: {
    height: 60,
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 60,
    zIndex: 1
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

export default CoverImage
