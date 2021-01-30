import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, IconButton } from '../Components'
import useTheme from '../DesignSystem/Context'
export const HEADER_HEIGHT = 60

export const Header = ({ title, subtitle }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const onPressBack = () => {
    requestAnimationFrame(() => {
      navigation.goBack()
    })
  }

  return (
    <View paddingB-8 paddingT-36 style={{ backgroundColor: colors.background }}>
      <View row>
        <IconButton
          icon='keyboard-backspace'
          onPress={onPressBack}
          color={colors.textColor}
        />
        <View paddingT-8>
          <Text title1 numberOfLines={1}>{title}</Text>
          {subtitle && (
            <Text subhead numberOfLines={1}>{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default Header
