import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, ImageBackground, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { BlurView } from '@react-native-community/blur'
import hexToRgba from 'hex-to-rgba'

import { View } from '../Components'
import useTheme from '../DesignSystem/Context'
import { NETWORK_STATUS, isAndroid } from '../Constants'

// const HEADER_HEIGHT = Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight

const Screen = ({
  backgroundImage,
  containerStyle,
  networkStatus,
  isLoading,
  children,
  SkeletonComponent
}) => {
  const { colors } = useTheme()

  const [_backgroundImage, setBackgroundImage] = useState(null)

  const renderLoaderOverlay = () => {
    if (isLoading || networkStatus === NETWORK_STATUS.FETCHING) {
      return (
        <View style={styles.blurOverlayContainer}>
          <BlurView
            style={styles.blurOverlay}
            reducedTransparencyFallbackColor='gray'
            blurType='dark'
            blurAmount={6}
          />
          <ActivityIndicator color={colors.primary} size={120} />
        </View>
      )
    }

    return <></>
  }

  const renderContent = () => {
    // if (SkeletonComponent) {
    //   return <SkeletonComponent />
    // }
    if (isLoading || networkStatus === NETWORK_STATUS.FETCHING) {
      if (SkeletonComponent) {
        return <SkeletonComponent />
      }

      return renderLoaderOverlay()
    }

    return children
  }

  useEffect(() => {
    setBackgroundImage(backgroundImage)
  }, [backgroundImage])

  return (
    <SafeAreaView
      forceInset={{ top: 'never' }}
      style={[
        styles.root,
        { backgroundColor: colors.background }
      ]}
    >
      {/* {renderLoaderOverlay()} */}
      <KeyboardAvoidingView
        behavior={isAndroid ? null : 'padding'}
        style={styles.root}
      >
        <StatusBar backgroundColor='transparent' barStyle='light-content' />
        <ImageBackground
          style={[
            styles.container
          ]}
          source={{ uri: _backgroundImage }}
        >
          <View
            style={[
              styles.container,
              styles.bgImageOverlay,
              {
                backgroundColor: hexToRgba(colors.background, 0.9)
              },
              containerStyle
            ]}
          />
          <View style={[styles.container, styles.content]}>
            {renderContent()}
            {/* {children} */}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    flexGrow: 1
  },
  bgImageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    ...StyleSheet.absoluteFillObject
  },
  blurOverlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
    position: 'relative',
    zIndex: 1
  }
})

export default Screen
