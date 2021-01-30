import React, { useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import { View, Modal, Text, Divider, Button } from '../Components'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'

const IMAGE_PICKER_SETTINGS = {
  mediaType: 'photo',
  includeBase64: true,
  cropping: true,
  compressImageMaxWidth: 1024,
  compressImageQuality: 0.8
}

const ImagePickerModal = ({ isVisible, onPickImage, onModalHide }) => {
  const modalRef = useRef()

  const openPicker = () => {
    try {
      ImagePicker.openPicker(IMAGE_PICKER_SETTINGS).then(image => {
        const imageDataUri = `data:${image.mime};base64,${image.data}`
        onPickImage(imageDataUri)
        modalRef.current.hide()
      })
    } catch (error) {

    }
  }

  const openCamera = () => {
    try {
      ImagePicker.openCamera(IMAGE_PICKER_SETTINGS).then(image => {
        const imageDataUri = `data:${image.mime};base64,${image.data}`
        onPickImage(imageDataUri)
        modalRef.current.hide()
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    if (isVisible) {
      modalRef.current.show()
    } else {
      modalRef.current.hide()
    }
  }, [isVisible])

  return (
    <Modal
      ref={modalRef}
      style={styles.modal}
      contentContainerStyle={styles.modalContent}
      onModalHide={onModalHide}
      onBackdropPress={onModalHide}
      onBackButtonPress={onModalHide}
    >
      <View flex row center>
        <View center>
          <Button
            primary
            outline
            icon='camerao'
            iconSize={40}
            onPress={openCamera}
            style={styles.actionButton}
          />
          <View marginT-10>
            <Text caption1>Camera</Text>
          </View>
        </View>
        <Divider vertical />
        <View center>
          <Button
            primary
            outline
            icon='picture'
            iconSize={40}
            onPress={openPicker}
            style={styles.actionButton}
          />
          <View marginT-10>
            <Text caption1>Gallery</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
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

export default ImagePickerModal
