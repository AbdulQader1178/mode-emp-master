import { StyleSheet, Platform } from 'react-native'

import { isAndroid } from '../Constants'
import COLORS from '../Constants/Colors'
import elevationShadowStyle from '../Utils/ShadowStyle'
import Spacings from '../DesignSystem/Spacings'
import { TEXT_BOLD, TEXT_NORMAL } from '../Components/Text'

export const getHeaderInfo = () => {
  return isAndroid && Platform.Version > 20
    ? {
      height: 90,
      elevation: 0,
      paddingTop: 30
    }
    : {
      height: 60
    }
}

export default StyleSheet.create({
  header: {
    height: 60
  },

  header_statusBar: {
    ...getHeaderInfo()
  },

  backButton: {
    alignItems: 'center',
    height: 60,
    paddingHorizontal: Spacings.gridGutter / 2,
    paddingVertical: Spacings.gridGutter / 2,
    width: 50
  },

  headerTitle: {
    width: (Spacings.screenWidth * 2) / 3,
    fontWeight: '300'
  },

  navbarFlatSelector: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    ...elevationShadowStyle({ elevation: 20 })
  },

  tabBarUnderlineStyle: {},

  tabStyle: {},

  activeTabStyle: {},

  tabTextStyle: {
    ...TEXT_NORMAL,
    opacity: 0.6
  },

  activeTabTextStyle: {
    ...TEXT_BOLD
  }
})
