import React from 'react'
import ImageView from 'react-native-image-viewing'

const ModalImageViewer = (props) => {
  return (
    <ImageView
      swipeToCloseEnabled={false}
      {...props}
    />
  )
}

export default ModalImageViewer
