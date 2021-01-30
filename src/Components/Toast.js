import React from 'react'
import { Platform } from 'react-native'
import Toast from 'react-native-root-toast'
import { iOSColors } from 'react-native-typography'

let toast

// Toast dosen't show in android in RN >= 0.62
// https://github.com/magicismight/react-native-root-toast/issues/124#issuecomment-619519865
export default function showToast (message, type, duration = 5000) {
  Toast.show(message, {
    backgroundColor: type === 'success'
      ? iOSColors.green
      : type === 'error'
        ? iOSColors.red
        : type === 'info'
          ? iOSColors.blue
          : 'rgba(0,0,0, 0.7)',
    // width: 300,
    // height: 40,
    textColor: '#ffffff',
    // fontSize: 10,
    // lineHeight: 2,
    // lines: 4,
    // borderRadius: 6,
    opacity: 0.9,
    fontWeight: 'bold',
    position: 60
  })
}

export function hideLoading () {
  Toast.hide(toast)
}

export function showLoading (message = '') {
  toast = Toast.showLoading(message, {
    position: 0,
    containerStyle: {
      padding: 30,
      backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    textColor: 'white',
    textstyle: { fontSize: 16 }
    // maskColor:'rgba(10, 10, 10, 0.5)'
  })
}

export function showErrorToast (message) {
  showToast(message, 'error')
}

export function showSuccessToast (message) {
  showToast(message, 'success')
}

export function showInfoToast (message) {
  showToast(message, 'info')
}
