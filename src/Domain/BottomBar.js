import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useStoreState } from 'easy-peasy'
import hexToRgba from 'hex-to-rgba'

import { View, Icon, TouchableRipple, ProfileImage } from '../Components'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import elevationShadowStyle from '../Utils/ShadowStyle'
import DrawerMenu from './DrawerMenu'
import { Routes } from '../Navigation'
import { EMPLOYEE_TYPE } from '../Constants'

export const BOTTOM_BAR_ACTUAL_HEIGHT = 75
export const BOTTOM_BAR_HEIGHT = 50
const MODAL_ACTION_BUTTON_HEIGHT = 220
const MODAL_ACTION_BUTTON_IMAGE_SIZE = 90

export const BottomBar = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const {
    model: { image },
    userType
  } = useStoreState((state) => ({ ...state.user }))

  const [isDrawerMenuVisible, setIsDrawerMenuVisible] = useState(false)
  return (
    <View style={[styles.root]}>
      <View style={[styles.bar, { backgroundColor: hexToRgba(colors.surface, 0.9) }]}>
        <View centerV flex row spread>
          <View row>
            <TouchableRipple
              onPress={() => setIsDrawerMenuVisible(true)}
              style={styles.bottomBarActionButton}
            >
              <Icon type='Feather' name='menu' size={32} color={COLORS.white} />
            </TouchableRipple>
            {/* {userType === EMPLOYEE_TYPE.SALES_PERSON.id && (
              <TouchableRipple
                onPress={() => navigation.navigate(Routes.SEARCH)}
                style={styles.bottomBarActionButton}
              >
                <Icon type='Feather' name='search' size={24} color={COLORS.white} />
              </TouchableRipple>
            )} */}
          </View>
          <View>
            <TouchableRipple
              onPress={() => navigation.navigate(Routes.PROFILE)}
              style={styles.bottomBarActionButton}
            >
              <ProfileImage source={image} size={32} />
            </TouchableRipple>
          </View>
        </View>
      </View>
      <DrawerMenu
        isVisible={isDrawerMenuVisible}
        onHide={() => setIsDrawerMenuVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: BOTTOM_BAR_ACTUAL_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  bar: {
    height: BOTTOM_BAR_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  arrowContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 50,
    width: 40,
    position: 'relative',
    left: -20
  },
  logo: {
    height: 16,
    marginLeft: -10,
    width: 70
  },
  bottomBarActionButton: {
    alignItems: 'center',
    height: BOTTOM_BAR_HEIGHT,
    justifyContent: 'center',
    width: 60
  },
  bottomBarProfileActionButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 360
  },
  modalActionButton: {
    alignItems: 'center',
    borderRadius: Spacings.borderRadius,
    borderTopLeftRadius: 0,
    ...elevationShadowStyle({ elevation: 12 }),
    flex: 1,
    height: MODAL_ACTION_BUTTON_HEIGHT,
    justifyContent: 'center',
    marginHorizontal: Spacings.gridGutter,
    marginBottom: Spacings.gridGutter
  },
  modalActionButtonImageContainer: {
    height: MODAL_ACTION_BUTTON_IMAGE_SIZE,
    width: MODAL_ACTION_BUTTON_IMAGE_SIZE
  }
})

export default BottomBar
