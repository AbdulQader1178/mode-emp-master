import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { human, systemWeights, iOSColors } from 'react-native-typography'
import check from 'check-types'

import Icon from './Icon'
import elevationShadowStyle from '../Utils/ShadowStyle'
import COLORS from '../Constants/Colors'
import useTheme from '../DesignSystem/Context'

const DEFAULT_BUTTON_COLOR = COLORS.blue300
const DEFAULT_BUTTON_TEXT_COLOR = COLORS.white
const DOT_SIZE = 15

const FloatingActionButton = ({
  text,
  icon,
  iconType = 'AntDesign',
  onPress = () => { },
  showDot,
  color,
  style
}) => {
  const { colors } = useTheme()

  const buttonStyle = () => {
    const elevation = elevationShadowStyle({ elevation: 20 })

    if (check.assigned(text)) {
      return {
        ...styles.button,
        ...styles.buttonWithText,
        ...elevation,
        backgroundColor: color || colors.primary,
        ...style
      }
    } else {
      return {
        ...styles.button,
        ...elevation,
        backgroundColor: color || colors.primary,
        ...style
      }
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={buttonStyle()}
    >
      <View style={styles.buttonContent}>
        <Icon
          type={iconType}
          name={check.assigned(icon) ? icon : 'plus'}
          size={30}
          color={DEFAULT_BUTTON_TEXT_COLOR}
        />
        {
          check.not.assigned(text)
            ? <></>
            : (
              <Text style={styles.text}>
                {text}
              </Text>
            )
        }
        {
          showDot && <View style={[styles.dot, { borderColor: colors.background }]} />
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: DEFAULT_BUTTON_COLOR,
    borderRadius: 50,
    position: 'absolute',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  buttonWithText: {
    height: 45,
    width: 'auto'
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  text: {
    ...human.body,
    ...systemWeights.bold,
    color: DEFAULT_BUTTON_TEXT_COLOR,
    marginHorizontal: 10
  },
  dot: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: iOSColors.white,
    borderRadius: DOT_SIZE,
    height: DOT_SIZE,
    position: 'absolute',
    top: -DOT_SIZE,
    right: 0,
    width: DOT_SIZE
  }
})

export default FloatingActionButton
