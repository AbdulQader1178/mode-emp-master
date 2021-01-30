import React from 'react'
import { StyleSheet } from 'react-native'
import { Picker as NBPicker } from 'native-base'

import Icon from './Icon'
import Text from './Text'

const Picker = ({ mode = 'dropdown', placeholder, onValueChange, selectedValue, ...props }) => {
  return (
    <>
      <NBPicker
        mode={mode}
        style={{ width: undefined }}
        {...props}
        iosIcon={<Icon name='chevron-down' />}
        onValueChange={onValueChange}
        selectedValue={selectedValue}
      />
      <Text footnote numberOfLines={1} style={styles.pickerText}>
        {placeholder}
      </Text>
    </>

  )
}
const styles = StyleSheet.create({
  pickerText: {
    fontSize: 15,
    position: 'absolute',
    top: 15,
    right: 8,
    width: '90%'
  }
})
export default Picker
