import React from 'react'
import { View } from 'react-native'
import COLORS from '../Constants/Colors'

export default ({ small, large, vertical, line }) => {
  const gap = () => {
    if (small) {
      return 10
    }

    if (large) {
      return 40
    }

    return 20
  }

  if (line && vertical) {
    return (
      <View
        style={{
          backgroundColor: COLORS.grey700,
          width: 1,
          marginHorizontal: gap() / 2
        }}
      />
    )
  }

  if (line) {
    return (
      <View
        style={{
          backgroundColor: COLORS.grey700,
          height: 1,
          marginVertical: gap() / 2
        }}
      />
    )
  }

  if (vertical) {
    return (
      <View width={gap()} />
    )
  }

  return (
    <View height={gap()} />
  )
}
