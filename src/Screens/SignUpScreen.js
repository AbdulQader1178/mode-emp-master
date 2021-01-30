import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView, InteractionManager } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { countries } from 'countries-list'
import { useStoreState, useStoreActions } from 'easy-peasy'

import { View, Text, Logo, Input, Button, Icon, TouchableRipple, Select } from '../Components'
import { CountrySelectorModal, Header, Screen } from '../Domain'
import useTheme from '../DesignSystem/Context'
import { EMAIL_REGEXP, NETWORK_STATUS } from '../Constants'
import useTranslation from '../i18n'

const { width, height } = Dimensions.get('screen')

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    fetchUserTypeList
  } = useStoreActions(actions => ({ ...actions.app }))
  const {
    signUpUser
  } = useStoreActions(actions => ({ ...actions.signUp }))

  const {
    networkStatus: userTypeListFetchNetworkStatus,
    userTypeList
  } = useStoreState(state => ({ ...state.app }))
  const {
    networkStatus
  } = useStoreState(state => ({ ...state.signUp }))
  const {
    networkStatus: loginNetworkStatus
  } = useStoreState(state => ({ ...state.authN }))

  const [userType, setUserType] = useState({ id: null, title: null })
  const [countryCode, setCountryCode] = useState('SA')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isCountrySelectorModalVisible, setIsCountrySelectorModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, errors } = useForm()

  const onSubmit = (formData) => {
    signUpUser({
      ...formData,
      callingCode: countries[countryCode].phone,
      userType: userType.id
    })
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
    InteractionManager.runAfterInteractions(() => {
      fetchUserTypeList()
    })
  }, [])

  useEffect(() => {
    setIsLoading(networkStatus === NETWORK_STATUS.FETCHING ||
      loginNetworkStatus === NETWORK_STATUS.FETCHING)
  }, [networkStatus, loginNetworkStatus])

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps='handled'
      >
        <Header />
        <View centerH flex>
          <View style={styles.container}>
            <View centerH marginB-16>
              <Logo />
            </View>
            <View marginT-32>
              <Select
                label={t('areaOfOperation')}
                options={userTypeList}
                modalTitle={t('selectAreaOfOperation')}
                onSelect={setUserType}
                isLoading={userTypeListFetchNetworkStatus === NETWORK_STATUS.FETCHING}
              />
            </View>
            <View marginT-32>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    label={t('name')}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    error={errors.name}
                  />
                )}
                name='name'
                rules={{ required: true }}
              />
            </View>
            <View marginT-32>
              <TouchableRipple
                onPress={() => setIsCountrySelectorModalVisible(true)}
                style={styles.callingCodePrefix}
              >
                <View centerV paddingV-16 row spread>
                  <Text body>{`+${countries[countryCode].phone}`}</Text>
                  <Icon type='EvilIcons' name='chevron-down' color={colors.text} />
                </View>
              </TouchableRipple>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    label={t('phoneNumber')}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value.replace(/[^0-9]/g, ''))}
                    value={value}
                    autoCorrect={false}
                    keyboardType='phone-pad'
                    maxLength={10}
                    blurOnSubmit={false}
                    returnKeyType='next'
                    style={{ paddingLeft: 80 }}
                    error={errors.mobile}
                  />
                )}
                name='mobile'
                defaultValue=''
                rules={{
                  required: true
                }}
              />
            </View>
            <View marginT-32>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    label={t('email')}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    error={errors.email}
                  />
                )}
                name='email'
                defaultValue=''
                rules={{
                  required: true,
                  pattern: EMAIL_REGEXP
                }}
              />
            </View>
            <View marginT-32>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    label={t('password')}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    onSubmitEditing={() => handleSubmit(onSubmit)()}
                    rules={{ required: true }}
                    returnKeyType='done'
                    secureTextEntry={isPasswordHidden}
                    error={errors.password}
                  />
                )}
                name='password'
                defaultValue=''
                rules={{ required: true }}
              />
              <TouchableRipple
                onPress={() => setIsPasswordHidden(state => !state)}
                style={styles.passwordVisibilityToggler}
              >
                <Icon
                  type='MaterialCommunityIcons'
                  name={isPasswordHidden ? 'eye-off' : 'eye-outline'}
                  color={colors.primary}
                />
              </TouchableRipple>
            </View>
            <View marginV-32>
              <Button
                label={t('signUp')}
                onPress={() => handleSubmit(onSubmit)()}
                isLoading={isLoading}
              />
            </View>
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
    width: 80,
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

export default SignUpScreen
