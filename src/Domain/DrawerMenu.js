import React, { useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { View, TouchableRipple, Modal, Text, Logo } from '../Components'
import useAuth from '../Services/Auth'
import { Routes } from '../Navigation'

export const DrawerMenu = ({ isVisible = false, onHide = null }) => {
  const { logout } = useAuth()
  const navigation = useNavigation()

  const modalRef = useRef()

  const Item = ({ title, onPressItem }) => {
    return (
      <TouchableRipple
        onPress={() => {
          onHide()
          onPressItem()
        }}
        style={styles.menuItem}
      >
        <View paddingH-32 paddingV-16>
          <Text subhead>{title}</Text>
        </View>
      </TouchableRipple>
    )
  }

  useEffect(() => {
    if (isVisible) {
      modalRef.current.show()
    } else {
      modalRef.current.hide()
    }
  }, [isVisible])

  return (
    <>
      <Modal
        ref={modalRef}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
        onModalHide={onHide}
      >
        <View marginV-48>
          <View marginB-16 paddingH-32>
            <Logo small />
          </View>
          <Item
            title='My Profile'
            onPressItem={() => navigation.navigate(Routes.PROFILE)}
          />
          <Item
            title='Settings'
            onPressItem={() => navigation.navigate(Routes.SETTING_SCREEN)}
          />
          <Item title='Logout' onPressItem={logout} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 300
  }
})

export default DrawerMenu
