import React, { useRef } from 'react'
import { TouchableOpacity, Alert, StyleSheet } from 'react-native'

import { View, Text, Icon, Modal, TouchableRipple, Divider } from '../Components'
import useTranslation from '../i18n'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import { LOCALES } from '../Constants'

const SelectLanguage = ({ onChange = () => { } }) => {
  const { colors } = useTheme()
  const { localeProvider, changeLocale } = useTranslation()
  const { t } = useTranslation()

  const modalRef = useRef()

  const currentLocale = Object.values(LOCALES).find(locale => locale.id === localeProvider.id)

  const onChangeLocale = (locale) => {
    Alert
      .alert(
        t('changeLanguage'),
        t('changeLanguageAppRestartWarning'),
        [
          {
            text: t('yesRestart'),
            onPress: () => {
              onChange(true)
              changeLocale(locale)
            }
          },
          {
            type: 'cancel',
            text: t('no'),
            onPress: () => modalRef.current.hide()
          }
        ]
      )
  }

  return (
    <>
      <TouchableRipple onPress={() => modalRef.current.show()}>
        <View padding-16 row spread>
          <View>
            <Text body>{t('language')}</Text>
            <Divider small />
            <Text caption1 style={{ color: COLORS.grey400 }}>
              {currentLocale ? currentLocale.label : ''}
            </Text>
          </View>
          <Icon type='EvilIcons' name='chevron-down' color={colors.textColor} />
        </View>
      </TouchableRipple>
      <Modal
        ref={modalRef}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <View paddingV-16>
          <LanguageSelection onChangeLocale={onChangeLocale} />
        </View>
      </Modal>
    </>
  )
}

const LanguageSelection = ({ onChangeLocale }) => {
  const { colors } = useTheme()
  const { localeProvider } = useTranslation()

  const renderLocaleItem = locale => {
    return (
      <TouchableOpacity
        key={locale.id}
        onPress={() => onChangeLocale(locale)}
        style={{ paddingVertical: 10 }}
      >
        <View paddingH-16 paddingV-8>
          {localeProvider.id === locale.id
            ? (
              <View row>
                <Text body>
                  {locale.label}
                </Text>
                <Icon
                  type='Ionicons'
                  name='ios-checkmark'
                  size={20}
                  color={colors.textColor}
                  style={{ marginLeft: 10 }}
                />
              </View>
            )
            : (
              <Text body>
                {locale.label}
              </Text>
            )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <>{Object.values(LOCALES).map(locale => renderLocaleItem(locale))}</>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: 320,
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    padding: 0
  }
})

export default SelectLanguage
