import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { default as RNMaterialMenu, MenuItem, MenuDivider } from 'react-native-material-menu'

const Menu = (props, ref) => {
  const { button, children } = props

  const menuRef = useRef()

  useImperativeHandle(ref, () => ({
    open: () => {
      menuRef.current.show()
    },
    close: () => {
      menuRef.current.hide()
    },
    show: () => {
      menuRef.current.show()
    },
    hide: () => {
      menuRef.current.hide()
    }
  }))

  return (
    <RNMaterialMenu
      ref={menuRef}
      button={button}
    >
      {children}
    </RNMaterialMenu>
  )
}

export { MenuItem, MenuDivider }
export default forwardRef(Menu)
