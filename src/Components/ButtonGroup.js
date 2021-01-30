import React from 'react'
import { StyleSheet } from 'react-native'
import { ButtonGroup as RNElementsButtonGroup } from 'react-native-elements'
import { human } from 'react-native-typography'

import useTheme from '../DesignSystem/Context'
import { TEXT_SEMIBOLD } from './Text'

export const SEARCHBAR_HEIGHT = 60

const ButtonGroup = ({
  buttons,
  ...rest
}) => {
  const { colors } = useTheme()

  return (
    <RNElementsButtonGroup
      buttons={buttons}
      textStyle={[styles.text, { color: colors.primary }]}
      containerStyle={[
        styles.container,
        { borderColor: colors.primary }
      ]}
      innerBorderStyle={{ color: colors.primary }}
      selectedButtonStyle={{
        backgroundColor: colors.primary
      }}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    height: 36,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    ...human.bodyObject,
    ...TEXT_SEMIBOLD
  }
})

export default ButtonGroup
