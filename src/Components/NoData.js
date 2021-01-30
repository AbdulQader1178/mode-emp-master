import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { human, iOSColors } from 'react-native-typography'

import useTranslation from '../i18n'

import View from './View'

const NoData = ({ image, text }) => {
  const { t } = useTranslation()

  return (
    <View center paddingV-120>
      <View marginB-16>
        <Image
          source={image || require('../../assets/images/nodata.png')}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
      <View paddingH-16>
        <Text
          style={{ ...human.caption1, color: iOSColors.gray, marginTop: 5 }}
        >
          {text || t('noRecordsFound')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120
  }
})

export default NoData
