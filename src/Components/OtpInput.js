import React from 'react'
import { StyleSheet } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import useTheme from '../DesignSystem/Context'

const OtpInput = (props) => {
  const { colors } = useTheme()

  return (
    <OTPInputView
      {...props}
      underlineColor={colors.primary}
      codeInputFieldStyle={[
        styles.codeInputField,
        { backgroundColor: colors.surface }
      ]}
      codeInputHighlightStyle={[
        { borderColor: colors.primary }
      ]}
      selectionColor={colors.text}
    />
  )
}

const styles = StyleSheet.create({
  codeInputField: {
    width: 50,
    height: 55,
    borderWidth: 0,
    borderBottomWidth: 1
  }
})

export default OtpInput
