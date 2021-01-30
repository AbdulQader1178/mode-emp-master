import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { human, systemWeights } from 'react-native-typography'
import check from 'check-types'

import { Icon, Text, View, Divider } from '.'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'

export const NAVBAR_CONTENT_HEIGHT = 50
export const NAVBAR_HEIGHT = NAVBAR_CONTENT_HEIGHT + StatusBar.currentHeight

const Navbar = (props) => {
  const {
    title,
    onPressBack,
    backgroundColor
  } = props
  const { theme, colors } = useTheme()

  return (
    <Header
      placement='left'
      leftComponent={
        onPressBack && (
          <Button
            onPress={() => onPressBack()}
            type='clear'
            icon={<Icon name='arrowleft' size={20} />}
          />)
      }
      centerComponent={
        <Text
          numberOfLines={1}
          title1
          bold
        >
          {title}
        </Text>
      }
      rightComponent={(
        <View row>
          {/* <Button
            onPress={() => null}
            type='clear'
            icon={<Icon name='search1' size={20} />}
          />
          <Divider vertical small /> */}
          <Button
            onPress={() => null}
            type='clear'
            icon={<Icon name='menuunfold' size={20} />}
          />
        </View>
      )}
      containerStyle={{
        backgroundColor: backgroundColor || colors.background,
        // backgroundColor: COLORS.blue300,
        borderBottomWidth: 0,
        height: NAVBAR_HEIGHT,
        paddingTop: StatusBar.currentHeight
      }}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
})

export default Navbar
