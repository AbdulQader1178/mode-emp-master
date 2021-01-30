import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { default as BottomSheetPlugin } from 'reanimated-bottom-sheet'

const BottomSheet = (props, ref) => {
  const bottomSheetRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current.open()
    },
    close: () => {
      bottomSheetRef.current.close()
    }
  }))

  return (
    <BottomSheetPlugin
      ref={bottomSheetRef}
      {...props}
    />
  )
}

export default forwardRef(BottomSheet)
