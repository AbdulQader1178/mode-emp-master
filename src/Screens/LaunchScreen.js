import React from 'react'
import { View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'

import useTheme from '../DesignSystem/Context'
import viewStyles from '../Styles/ViewStyles'
import COLORS from '../Constants/Colors'

const LaunchScreen = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={[
          styles.bg,
          { backgroundColor: colors.background }
        ]}
      >
        <View style={styles.innerContainer}>
          <ActivityIndicator size='large' color={COLORS.white} />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...viewStyles.container
  },
  innerContainer: {
    flexDirection: 'column-reverse',
    flexGrow: 1
  },
  bg: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingTop: 80,
    paddingBottom: 120
  }
})

export default LaunchScreen
