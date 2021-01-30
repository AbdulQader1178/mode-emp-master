import DeviceInfoContext from './Context'
import { useContext } from 'react'

const useDeviceInfoContext = props => {
  return useContext(DeviceInfoContext)
}

export default useDeviceInfoContext
