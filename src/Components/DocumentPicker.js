import React, { useState } from 'react'
import { default as RNDocumentPicker } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import check from 'check-types'

import Button from './Button'
import View from './View'
import { TouchableOpacity } from 'react-native-ui-lib'
import Icon from './Icon'
import useTheme from '../DesignSystem/Context'

const DocumentPicker = ({
  type = 'single',
  allowedFileTypes = [],
  includeBase64 = true,
  onSelect,
  onRemove,
  isSelected = false
}) => {
  const { colors } = useTheme()

  const _onSelect = (base64Data) => {
    onSelect(base64Data)
  }

  const _onRemove = () => {
    onRemove()
  }

  const _allowedFileTypes = () => {
    if (check.emptyArray(allowedFileTypes)) {
      return DocumentPicker.types.allFiles
    }

    return allowedFileTypes.map(f => {
      if (f === 'image') {
        return RNDocumentPicker.types.images
      }
      if (f === 'plainText') {
        return RNDocumentPicker.types.plainText
      }
      if (f === 'pdf') {
        return RNDocumentPicker.types.pdf
      }
    })
  }

  // Pick a single file
  const pick = () => {
    try {
      RNDocumentPicker.pick({
        type: _allowedFileTypes(),
        readContent: includeBase64
      })
        .then(res => {
          RNFS.readFile(res.uri, 'base64')
            .then(file => _onSelect(`data:${res.type};base64,${file}`))
        })
    } catch (err) {
      if (RNDocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  // Pick multiple files
  const pickMultiple = () => {
    try {
      RNDocumentPicker.pickMultiple({
        type: _allowedFileTypes(),
        readContent: includeBase64
      })
        .then(results => onSelect(results))
    } catch (err) {
      if (RNDocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  if (isSelected) {
    return (
      <TouchableOpacity onPress={_onRemove}>
        <Icon name='closecircle' color={colors.error} />
      </TouchableOpacity>
    )
  }

  return (
    <Button
      label='Upload'
      outline
      small
      onPress={() => type === 'single' ? pick() : pickMultiple()}
    />
  )
}

export default DocumentPicker
