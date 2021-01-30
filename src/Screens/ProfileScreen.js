import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import { Divider } from '../Components'
import {
  Screen,
  Header,
  ProfileDetail
} from '../Domain'
import useTheme from '../DesignSystem/Context'

const ProfileScreen = () => {
  const { colors } = useTheme()

  return (
    <Screen>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.backgroundColor }]}
        refreshControl={
          <RefreshControl />
        }
      >
        <Header title='My Profile' />
        <Divider />
        <ProfileDetail />
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

export default ProfileScreen
