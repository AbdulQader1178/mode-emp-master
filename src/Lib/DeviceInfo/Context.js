import React, { useState } from 'react'
import useDeviceInfo from './DeviceInfo'

const DeviceInfoContext = React.createContext()

export const DeviceInfoProvider = ({ children }) => {
  const deviceInfo = useDeviceInfo()

  return (
    <DeviceInfoContext.Provider value={deviceInfo}>
      {children}
    </DeviceInfoContext.Provider>
  )
}

export default DeviceInfoContext
