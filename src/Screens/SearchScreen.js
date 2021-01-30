import React from 'react'

import { IconButton, SearchBar, View } from '../Components'
import { Screen } from '../Domain'
import useTheme from '../DesignSystem/Context'
import { ScrollView } from 'react-native'

const SearchScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <Screen>
      <View paddingT-48>
        <View row>
          <IconButton
            icon='keyboard-backspace'
            onPress={() => navigation.goBack()}
            color={colors.textColor}
          />
          <View flex paddingR-16>
            <SearchBar placeholder='Search' style={{ width: '100%' }} />
          </View>
        </View>
      </View>
      <ScrollView />
    </Screen>
  )
}

export default SearchScreen
