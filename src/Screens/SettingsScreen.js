import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import {
  Screen,
  Header,
  SelectLanguage
} from '../Domain'
import LaunchScreen from './LaunchScreen'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'

const SettingsScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = React.useState(false)

  if (isLoading) {
    return <LaunchScreen />
  }

  return (
    <Screen>
      <Header title='Settings' />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.backgroundColor }]}
        refreshControl={
          <RefreshControl />
        }
      >
        <SelectLanguage onChange={() => setIsLoading(true)} />
      </ScrollView>

    </Screen>
  )
}

const styles = {
  container: {
    flex: 1,
    flexGrow: 1
  }
}

export default SettingsScreen
