import React from 'react'
import Shimmer from 'react-native-shimmer'

import useTheme from '../DesignSystem/Context'

const Skeleton = (props) => {
  const { colors } = useTheme()

  return (
    <Shimmer
      {...props}
    >
      {props.children}
    </Shimmer>
  )
}

export default Skeleton
