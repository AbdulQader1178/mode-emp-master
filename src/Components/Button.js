import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button as RNUiLibButton } from 'react-native-ui-lib'
import { human } from 'react-native-typography'

import { Icon } from '.'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import useTheme from '../DesignSystem/Context'
import { TEXT_BOLD } from './Text'

export const BUTTON_HEIGHT = 50
export const BUTTON_SMALL_HEIGHT = 36

const Button = ({
  label,
  icon,
  iconType = 'AntDesign',
  iconSize = 16,
  small,
  shadow,
  primary = true,
  secondary,
  outline,
  link,
  disabled,
  isLoading,
  children,
  backgroundColor,
  color,
  style,
  ...rest
}) => {
  const { colors } = useTheme()

  const [_label, setLabel] = useState(null)
  const [_icon, setIcon] = useState(null)

  const getBackgroundColor = () => {
    // if (disabled) {
    //   if (secondary) {
    //     return hexToRgba(colors.accent, 0.7)
    //   }

    //   if (backgroundColor) {
    //     return hexToRgba(colors.accent, 0.7)
    //   }

    //   return hexToRgba(colors.primary, 0.7)
    // }

    if (outline || link) {
      return 'transparent'
    }

    if (backgroundColor) {
      return backgroundColor
    }

    if (secondary) {
      return colors.accent
    }

    return colors.primary
  }

  const getLabelColor = () => {
    if (color) {
      return color
    }

    if (link) {
      return colors.primary
    }

    if (primary && outline) {
      return colors.primary
    }

    if (secondary && outline) {
      return colors.accent
    }

    return COLORS.white
  }

  const getBorderColor = () => {
    if (secondary) {
      return colors.accent
    }

    return colors.primary
  }

  const buttonStyles = [
    styles.button,
    small && styles.smallButton,
    shadow && styles.shadow,
    outline && { borderColor: getBorderColor() },
    style && { ...style }
  ]

  const labelStyles = [
    styles.label,
    { color: getLabelColor() }
  ]

  const iconStyles = [
    { color: getLabelColor() },
    label && styles.icon
  ]

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size='small' color={getLabelColor()} />
    }

    if (icon && !children) {
      return <Icon name={_icon} type={iconType} size={iconSize} style={iconStyles} />
    }

    return children
  }

  useEffect(() => {
    if (isLoading) {
      setLabel('')
      setIcon(icon)
    } else {
      setLabel(label)
      setIcon(icon)
    }
  }, [isLoading, label])

  return (
    <RNUiLibButton
      style={buttonStyles}
      iconStyle={iconStyles}
      backgroundColor={getBackgroundColor()}
      outlineColor={getBackgroundColor()}
      borderRadius={0}
      labelStyle={labelStyles}
      disabled={disabled || isLoading}
      label={_label}
      {...rest}
    >
      {renderContent()}
    </RNUiLibButton>
  )
}

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT
  },
  smallButton: {
    height: BUTTON_SMALL_HEIGHT
  },
  label: {
    ...human.footnoteObject,
    ...TEXT_BOLD,
    color: COLORS.white
  },
  icon: {
    marginLeft: -Spacings.gridGutter / 2,
    marginRight: Spacings.gridGutter / 2
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
})

export default Button
