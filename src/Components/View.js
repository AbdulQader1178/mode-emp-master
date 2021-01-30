import React from 'react'
import { View as UiLibView } from 'react-native-ui-lib'

import Spacings from '../DesignSystem/Spacings'

const View = (props) => {
  const { padded, children } = props

  return (
    <UiLibView
      style={{ marginHorizontal: padded ? Spacings.gridGutter : 0 }}
      {...props}
    >
      {children}
    </UiLibView>
  )
}

export default View
