import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { countries } from 'countries-list'
import { useStoreState, useStoreActions } from 'easy-peasy'
import check from 'check-types'

import { View, Text, Logo, Input, Button, Icon, Divider, ButtonToggleGroup } from '../Components'
import { CountrySelectorModal, Screen } from '../Domain'
import LaunchScreen from './LaunchScreen'
import useTheme from '../DesignSystem/Context'
import { NETWORK_STATUS, APP_STATE, LOCALES } from '../Constants'
import useDeviceInfo from '../Lib/DeviceInfo/DeviceInfo'
import useAuth from '../Services/Auth'
import useTranslation from '../i18n'
import COLORS from '../Constants/Colors'
import { Routes } from '../Navigation'

const { width, height } = Dimensions.get('screen')
const locales = Object.values(LOCALES)
const localeOptions = Object.values(LOCALES).map(({ name, label }) => ({ value: name, label }))

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { localeProvider, changeLocale } = useTranslation()
  const { state } = useAuth()
  const { deviceId } = useDeviceInfo()
  const { t } = useTranslation()

  const {
    loginUser
  } = useStoreActions(actions => ({ ...actions.authN }))

  const {
    networkStatus: countryCodeListFetchNetworkStatus,
    countryCodeList
  } = useStoreState(state => ({ ...state.app }))
  const {
    networkStatus
  } = useStoreState(state => ({ ...state.authN }))

  const [countryCode, setCountryCode] = useState('SA')
  const [mobile, setMobile] = useState(null)
  const [password, setPassword] = useState(null)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isCountrySelectorModalVisible, setIsCountrySelectorModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onChangeLocale = (value) => {
    if (localeProvider.name !== value) {
      setIsLoading(true)
      changeLocale(locales.find(({ name }) => name === value))
    }
  }

  const onEditMobile = (text) => {
    setMobile(text.replace(/[^0-9]/g, ''))
  }

  const onSubmit = () => {
    loginUser({
      mobile,
      callingCode: countries[countryCode].phone,
      password,
      deviceId
    })
  }

  const renderLogo = () => {
    const localeIndex = locales.findIndex(l => l.id === localeProvider.id)

    return (
      <Animatable.View
        animation='slideInUp'
        duration={2500}
        style={{ top: check.assigned(localeProvider.name) ? 0 : 200 }}
        useNativeDriver
      >
        <View centerH>
          <Logo />
        </View>
        <View marginT-32>
          <ButtonToggleGroup
            options={localeOptions}
            initial={localeIndex}
            value={localeProvider.id}
            hasPadding
            onPress={onChangeLocale}
          />
        </View>
      </Animatable.View>
    )
  }

  const renderPhoneNumberInput = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => (
            countryCodeListFetchNetworkStatus === NETWORK_STATUS.FETCHING
              ? null
              : setIsCountrySelectorModalVisible(true))}
        >
          <View centerH paddingV-16 row spread>
            <Text subhead>
              {`${countries[countryCode].emoji}    ${countries[countryCode].name}`}
            </Text>
            {countryCodeListFetchNetworkStatus === NETWORK_STATUS.FETCHING
              ? <ActivityIndicator size={14} color={colors.text} />
              : <Icon type='EvilIcons' name='chevron-down' color={COLORS.white} />}
          </View>
        </TouchableOpacity>
        <Divider small />
        <View style={{ marginTop: -16 }}>
          <View style={styles.callingCodePrefix}>
            <Text body>{`+${countries[countryCode].phone}`}</Text>
          </View>
          <View>
            <Input
              label={t('phoneNumber')}
              onChangeText={onEditMobile}
              value={mobile}
              autoCorrect={false}
              keyboardType='phone-pad'
              maxLength={10}
              blurOnSubmit={false}
              returnKeyType='next'
              style={{ paddingLeft: 50 }}
            />
          </View>
        </View>
      </>
    )
  }

  const renderPasswordInput = () => {
    return (
      <View>
        <Input
          label={t('password')}
          onChangeText={value => setPassword(value)}
          onSubmitEditing={onSubmit}
          value={password}
          returnKeyType='done'
          secureTextEntry={isPasswordHidden}
          style={{ paddingRight: 50 }}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordHidden(state => !state)}
          style={styles.passwordVisibilityToggler}
        >
          <Icon
            type='MaterialCommunityIcons'
            name={isPasswordHidden ? 'eye-off' : 'eye-outline'}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderForm = () => {
    return (
      <Animatable.View
        animation='fadeInUp'
        duration={2500}
        delay={1000}
        style={{ top: check.assigned(localeProvider.name) ? 0 : 4000 }}
        useNativeDriver
      >
        <View marginT-32>
          {renderPhoneNumberInput()}
        </View>
        <View marginT-32>
          {renderPasswordInput()}
        </View>
        <View marginT-32 marginB-16>
          <Button
            label={t('signIn')}
            onPress={onSubmit}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
          />
        </View>
        <Button
          link
          small
          label={t('signUpForAccount')}
          color={colors.text}
          onPress={() => navigation.navigate(Routes.SIGN_UP_SCREEN)}
        />
      </Animatable.View>
    )
  }

  const renderCountrySelectorModal = () => {
    return (
      <CountrySelectorModal
        isVisible={isCountrySelectorModalVisible}
        onPressItem={setCountryCode}
        onHide={() => setIsCountrySelectorModalVisible(false)}
      />
    )
  }

  useEffect(() => {
    if (check.nonEmptyArray(countryCodeList)) {
      setCountryCode(countryCodeList[0].countryCode)
    }
  }, [countryCodeList])

  if (isLoading ||
    state === APP_STATE.UNKNOWN ||
    state === APP_STATE.AUTHENTICATING) {
    return <LaunchScreen />
  }

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps='handled'
      >
        <View centerH flex paddingT-96 spread>
          <View style={styles.container}>
            {renderLogo()}
            {renderForm()}
          </View>
        </View>
        {renderCountrySelectorModal()}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  input: {
    textDecorationLine: 'none'
  },
  container: {
    width: width > 360 ? 360 : (width - 80)
  },
  callingCodePrefix: {
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'green',
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 60,
    zIndex: 1
  },
  passwordVisibilityToggler: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 60
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: height - 100
  },
  initialLanguageSelectionModalContent: {
    height
  }
})

export default LoginScreen
