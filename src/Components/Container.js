import React, { useRef } from 'react'
import {
  Platform,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
// import SafeAreaView from 'react-native-safe-area-view'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
// import FlashMessage from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable'
import hexToRgba from 'hex-to-rgba'

import { View } from '.'
import useDeviceInfoContext from '../Lib/DeviceInfo'
import useTheme from '../DesignSystem/Context'
import viewStyles from '../Styles/ViewStyles'
import { NAVBAR_HEIGHT } from './Navbar'
import Spacings from '../DesignSystem/Spacings'

const Container = props => {
  const {
    children,
    parallax,
    navbarHeight,
    headerHeight,
    containerStyle,
    backgroundImage = null,
    navbarBackgroundColor,
    headerBackgroundColor,
    headerImage,
    renderNavbar,
    renderHeaderContent,
    renderFixedHeaderContent,
    fixedHeaderContentContainerStyle,
    renderFloatingActionButton,
    refreshControl,
    isLoading
  } = props
  const { colors, theme } = useTheme()
  const deviceInfo = useDeviceInfoContext()

  const _navbarHeight = navbarHeight || NAVBAR_HEIGHT
  const _headerHeight = headerHeight ||
    (Platform.OS === 'android' && deviceInfo.hasNotch ? 120 : 100)

  const fixedHeaderContentContainer = useRef(null)

  const _navbarBackgroundColor = navbarBackgroundColor || colors.background

  const renderParallaxBackground = () => {
    return <Image source={headerImage} style={styles.image} />
  }

  const renderParallaxForeground = () => {
    return (
      <Animated.View
        style={{
          backgroundColor: headerBackgroundColor,
          flex: 1,
          width: '100%'
        }}
      >
        {renderHeaderContent()}
      </Animated.View>
    )
  }

  const renderLoader = () => {
    if (isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large' color={theme.colors.primary} />
        </View>
      )
    }

    // if (isLoading) {
    //   return (
    //     <ProgressBar
    //       color={theme.colors.primary}
    //       indeterminate
    //       borderRadius={0}
    //       borderWidth={0}
    //       height={4}
    //       width={Dimensions.get('window').width}
    //       style={styles.loader}
    //     />
    //   )
    // }
  }

  const renderFixedHeader = () => {
    if (renderFixedHeaderContent) {
      return (
        <Animatable.View
          ref={fixedHeaderContentContainer}
          useNativeDriver
          style={{
            flex: 0,
            position: 'absolute',
            top: 100,
            left: 0,
            zIndex: 100,
            ...fixedHeaderContentContainerStyle
          }}
        >
          {renderFixedHeaderContent()}
        </Animatable.View>
      )
    }
  }

  const _renderFloatingActionButton = () => {
    return !renderFloatingActionButton ? <></> : renderFloatingActionButton()
  }

  // console.log('fixedHeaderContentContainer -> ', fixedHeaderContentContainer);
  // console.log('scrollableComponent -> ', scrollableComponent);

  // if (Platform.OS === 'android' && deviceInfo.hasNotch()) {
  //   SafeAreaView.setStatusBarHeight();
  // }

  if (parallax) {
    return (
      <View style={viewStyles.container}>
        {renderFixedHeader()}
        {_renderFloatingActionButton()}
        <ParallaxScroll
          // onHeaderFixed = {() => alert('fhbgdhgdf')}
          headerHeight={_navbarHeight}
          isHeaderFixed
          parallaxHeight={_headerHeight}
          parallaxBackgroundScrollSpeed={5}
          parallaxForegroundScrollSpeed={2.5}
          headerFixedBackgroundColor={hexToRgba(_navbarBackgroundColor, 1)}
          fadeOutParallaxForeground
          renderHeader={({ animatedValue }) => renderNavbar()}
          renderParallaxBackground={({ animatedValue }) => renderParallaxBackground()}
          renderParallaxForeground={({ animatedValue }) => renderParallaxForeground()}
          fadeOutParallaxBackground
          refreshControl={refreshControl}
          keyboardShouldPersistTaps='handled'
          useNativeDriver
          // renderHeader={({ animatedValue }) => renderNavbar()}
          // headerHeight={50}
          // isHeaderFixed={false}
          // parallaxHeight={_headerHeight}
          // renderParallaxBackground={({ animatedValue }) => renderParallaxBackground()}
          // renderParallaxForeground={({ animatedValue }) => renderParallaxForeground()}
          // parallaxBackgroundScrollSpeed={5}
          // parallaxForegroundScrollSpeed={2.5}
          {...props}
        // onScrollEndDrag={onScrollEndSnapToEdge}
        // onMomentumScrollEnd={onScrollEndSnapToEdge}
        // onScroll={event => onScroll(event)}
        >
          {/* <ImageBackground
            source={_backgroundImage()}
            style={styles.bgImage}
          > */}
          <View style={[styles.wrapperForParallax, { backgroundColor: colors.background }, containerStyle]}>
            {renderLoader()}
            {children}
          </View>
          {/* </ImageBackground> */}
        </ParallaxScroll>
      </View>
    )
  }

  return (
    <View style={[viewStyles.container, { backgroundColor: colors.background }]}>
      {_renderFloatingActionButton()}
      <ImageBackground
        source={backgroundImage}
        style={styles.bgImage}
      >
        <ScrollView
          contentContainerStyle={[viewStyles.container]}
          refreshControl={refreshControl || null}
        >
          <View style={[styles.wrapper, containerStyle]}>
            {renderLoader()}
            {children}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

Container.propTypes = {
  parallax: PropTypes.bool,
  containerStyle: PropTypes.object,
  backgroundImage: PropTypes.string,
  navbarBackgroundColor: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  headerImage: PropTypes.object,
  renderNavbar: PropTypes.func,
  renderHeaderContent: PropTypes.func,
  renderFixedHeaderContent: PropTypes.func,
  fixedHeaderContentContainerStyle: PropTypes.object,
  renderFloatingActionButton: PropTypes.func,
  refreshControl: PropTypes.object,
  isLoading: PropTypes.bool
}

const styles = StyleSheet.create({
  test: {
    borderWidth: 5,
    borderColor: 'red'
  },
  test1: {
    borderWidth: 5,
    borderColor: 'green'
  },
  wrapperForParallax: {
    borderTopLeftRadius: Spacings.borderRadius,
    borderTopRightRadius: Spacings.borderRadius,
    flex: 1,
    zIndex: 10,
    marginTop: -Spacings.borderRadius,
    position: 'relative',
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    padding: 25,
    zIndex: 10,
    position: 'relative'
  },
  bgImageContainer: {
    backgroundColor: '#fafafa'
  },
  bgImage: {
    flex: 1,
    position: 'relative',
    width: null,
    height: null,
    zIndex: 10
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  activityIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
  },
  // https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d
  imageContainer: {
    flex: 1
  },
  image: {
    alignSelf: 'stretch',
    flex: 1,
    width: undefined,
    height: undefined,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default Container
