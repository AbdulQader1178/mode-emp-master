import React, { useImperativeHandle, forwardRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { default as RNModal } from 'react-native-modal'

import { View } from '.'
import useTheme from '../DesignSystem/Context'
import Spacings from '../DesignSystem/Spacings'

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('screen')

const Modal = (props, ref) => {
  const { colors } = useTheme()
  const { isFullScreen, contentContainerStyle, children } = props
  const [isModalVisible, setModalVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setModalVisible(true)
    },
    close: () => {
      setModalVisible(false)
    },
    show: () => {
      setModalVisible(true)
    },
    hide: () => {
      setModalVisible(false)
    }
  }))

  return (
    <RNModal
      isVisible={isModalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      useNativeDriver
      style={styles.root}
      {...props}
    >
      <View
        style={[
          styles.content,
          { backgroundColor: colors.background },
          contentContainerStyle && { ...contentContainerStyle }
        ]}
      >
        {children}
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  root: {
    margin: 0
  },
  content: {
    borderTopLeftRadius: Spacings.borderRadius,
    borderTopRightRadius: Spacings.borderRadius,
    width: deviceWidth
  }
})

export default forwardRef(Modal)
