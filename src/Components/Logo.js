import React from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'

import { View } from '.'
const { width } = Dimensions.get('screen')

const Logo = ({
  source,
  small,
  large
}) => {
  return (
    <View
      style={[styles.container, small ? styles.logoSmall : large ? styles.logoLarge : styles.logoMedium]}
    >
      <Image
        style={styles.image}
        source={source || require('../../assets/images/logo.png')}
        resizeMode='contain'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  logoSmall: {
    height: 40,
    width: 120
  },
  logoMedium: {
    height: 80,
    width: 200
  },
  logoLarge: {
    height: 140,
    width: width > 360 ? 360 : (width - 40)
  },
  // https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d
  image: {
    alignSelf: 'stretch',
    flex: 1,
    height: undefined,
    width: undefined
  }
})

export default Logo
