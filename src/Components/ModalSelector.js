import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { default as RNModalSelector } from 'react-native-modal-selector'

import View from './View'
import Icon from './Icon'
import Input from './Input'

const ModalSelector = ({
  onChange,
  placeholder,
  ...props
}) => {
  const [selectedItem, setSelectedItem] = useState({ key: null, label: null })

  const _onChange = (item) => {
    setSelectedItem(item)
    if (onChange) {
      onChange(item)
    }
  }

  const renderSelector = () => {
    return (
      <View style={styles.inputContainer}>
        <Input
          editable={false}
          placeholder={placeholder}
          value={selectedItem.label}
        />
        <Icon type='EvilIcons' name='chevron-down' style={styles.chevron} />
      </View>
    )
  }

  return (
    <RNModalSelector
      {...props}
      onChange={_onChange}
    >
      {renderSelector()}
    </RNModalSelector>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 45,
    position: 'relative'
  },
  chevron: {
    position: 'absolute',
    right: 0,
    bottom: 10
  }
})

export default ModalSelector
