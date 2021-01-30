import React from 'react'
import Androw from 'react-native-androw'
import { StyleSheet } from 'react-native'

const ShadowView = ({ style, children }) => {
  return (
    <Androw
      style={[styles.shadow, style]}
    >
      {children}
    </Androw>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.3
  }
})

export default ShadowView
