import React from 'react'
import { TextInput } from 'react-native-paper'

import useTheme from '../DesignSystem/Context'

const Input = (props) => {
  const { colors } = useTheme()

  return (
    <TextInput
      {...props}
      underlineColor={colors.inputUnderLine}
      style={[
        { backgroundColor: colors.inputBackground },
        props.style && props.style
      ]}
    />
  )
}

export default Input
