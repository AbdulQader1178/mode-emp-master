import React from 'react'
import { Dimensions } from 'react-native'
import { default as RNShimmer } from 'react-native-shimmer'

import { View } from '../Components'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import { LOCALES } from '../Constants'

const width = 200

const Shimmer = ({ style, ...rest }) => {
  const { colors } = useTheme()
  const { locale } = useTranslation()

  return (
    <RNShimmer
      opacity={0.2}
      direction={locale === LOCALES.ARABIC.name ? 'left' : 'right'}
    >
      <View
        style={{ backgroundColor: colors.text, ...style }}
        width={width}
        {...rest}
      />
    </RNShimmer>
  )
}

Shimmer.View = ({ style, ...rest }) => {
  const { colors } = useTheme()

  return (
    <View
      bg-hrey40
      style={{ backgroundColor: colors.surface, ...style }}
      width={width}
      {...rest}
    />
  )
}

export default Shimmer
