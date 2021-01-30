import React from 'react'
import SwitchSelector from 'react-native-switch-selector'

import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'

// https://github.com/App2Sales/react-native-switch-selector
/*
const options = [
  { label: "01:00", value: "1" },
  { label: "01:30", value: "1.5" },
  { label: "02:00", value: "2" }
]
*/

const ButtonToggleGroup = ({ options, onPress, ...rest }) => {
  const { colors } = useTheme()

  return (
    <SwitchSelector
      options={options}
      textColor={COLORS.grey300}
      selectedColor={colors.text}
      buttonColor={colors.primary}
      borderColor={colors.primary}
      backgroundColor={colors.background}
      onPress={onPress}
      {...rest}
    />
  )
}

export default ButtonToggleGroup
