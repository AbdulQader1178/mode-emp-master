import React from 'react'
import { TouchableRipple as RNPaperTouchableRipple } from 'react-native-paper'

const TouchableRipple = ({ children, ...props }) => {
  return (
    <RNPaperTouchableRipple
      {...props}
    >
      {children}
    </RNPaperTouchableRipple>
  )
}

export default TouchableRipple
