import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useStoreState } from 'easy-peasy'

import { View, Text, ProfileImage } from '../Components'
import { Routes } from '../Navigation'
import Spacings from '../DesignSystem/Spacings'
import useTranslation from '../i18n/index'

const ProfileDetail = () => {
  const navigation = useNavigation()

  const {
    name,
    mobile,
    email,
    address,
    designation,
    image // base64 string
    // locationCoords // ["string","string"] eg ["12.4795", "8.3495"]
  } = useStoreState((state) => ({ ...state.user.model }))
  const { t } = useTranslation()
  return (
    <View flex flexG>
      <View centerH>
        <ProfileImage source={{ uri: image }} size={180} />
      </View>
      <View centerH margin-16>
        <Text title1 bold>
          {name}
        </Text>
      </View>
      <View marginV-16 paddingH-16>
        <Text subhead> {t('address')} </Text>
        <View style={styles.location}>
          <Text body>{address}</Text>
        </View>
      </View>
      {/* <View marginV-16 paddingH-16>
        <Text subhead>{t('Email')} </Text>
        <Text body>{email}</Text>
      </View> */}
      <View marginV-16 paddingH-16>
        <Text subhead>{t('phoneNumber')}</Text>
        <Text body>{mobile}</Text>
      </View>
      {/* <View marginV-16 paddingH-16>
        <Text subhead>Designation</Text>
        <Text body>{designation}</Text>
      </View> */}
      <View marginV-16 paddingH-16>
        <Text subhead>{t('birthDate')}</Text>
        <Text body>-</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  location: {
    flexDirection: 'row'
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: 50
  },
  submitButtonContainer: {
    padding: Spacings.gridGutter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default ProfileDetail
