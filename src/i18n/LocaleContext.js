import './i18n'
// import { find } from 'lodash'

import React from 'react'
import { I18nManager } from 'react-native'
import RNRestart from 'react-native-restart'
import I18n from 'i18n-js'
import useStorage from '../Services/AsyncStorage'
import { LOCALES } from '../Constants'
import translateOrFallback from './TranslateFallback'

const LocaleContext = React.createContext()

export const LocaleContextProvider = props => {
  const [locale, changeLocale] = useStorage('@language', { id: 0, name: null, label: null })
  I18n.locale = locale.name

  const _changeLocale = locale => {
    I18n.locale = locale.name
    changeLocale(locale)
    if (I18n.locale === 'ar') {
      I18nManager.forceRTL(true)
    } else {
      I18nManager.forceRTL(false)
    }
    RNRestart.Restart()
  }

  return (
    <LocaleContext.Provider
      value={{
        ...I18n,
        localeProvider: locale,
        t: translateOrFallback,
        changeLocale: _changeLocale
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext
