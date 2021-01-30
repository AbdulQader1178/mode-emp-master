import React, { useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info'

const inititalState = {
  deviceId: '',
  hasNotch: false
}

const useDeviceInfo = () => {
  const [deviceId, setDeviceId] = useState(inititalState.deviceId)
  const [hasNotch, setHasNotch] = useState(inititalState.hasNotch)

  useEffect(() => {
    DeviceInfo.hasNotch().then(hasNotch => {
      setHasNotch(hasNotch)
    })
  }, [])

  useEffect(() => {
    DeviceInfo.getDeviceId().then(deviceId => {
      setDeviceId(deviceId)
    })
  }, [])

  return { deviceId, hasNotch }
}

export default useDeviceInfo
