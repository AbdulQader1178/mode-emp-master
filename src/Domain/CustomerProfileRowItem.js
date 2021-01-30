import React from 'react'
import { Linking } from 'react-native'

import { View, Text, Divider, ProfileImage, IconButton } from '../Components'
import useTheme from '../DesignSystem/Context'
import { isAndroid } from '../Constants'

const CustomerProfileRowItem = ({ data, hasBottomLineDivider = true }) => {
  const { colors } = useTheme()

  const {
    customerName,
    customerImage,
    callingCode,
    mobile,
    containerStyle = {}
  } = data

  const dial = (phoneNumber) => {
    let url = ''
    if (isAndroid) {
      url = `tel:${phoneNumber}`
    } else {
      url = `telprompt:${phoneNumber}`
    }

    Linking.openURL(url)
  }

  return (
    <>
      <View centerV row spread style={containerStyle}>
        <View centerV row>
          <ProfileImage source={customerImage} size={40} />
          <Divider vertical />
          <Text body>{customerName}</Text>
        </View>
        <IconButton
          icon='phone'
          onPress={() => dial(`+${callingCode}${mobile}`)}
          size={24}
          color={colors.primary}
        />
      </View>
      {hasBottomLineDivider && <Divider line />}
    </>
  )
}

export default CustomerProfileRowItem
