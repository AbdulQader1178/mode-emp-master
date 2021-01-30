import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'
import check from 'check-types'

import { Button, IconButton, ImagePicker, Modal, Text, View } from '../Components'
import { EMPLOYEE_TYPE, NETWORK_STATUS } from '../Constants'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'

const ImageUploaderRowItem = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    updateMeasurementImages
  } = useStoreActions(actions => ({ ...actions.orderDetails }))

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))
  const {
    networkStatus,
    model: { measurementImages }
  } = useStoreState(state => ({ ...state.orderDetails }))

  const [_images, setImages] = React.useState([])
  const [isEditable, setIsEditable] = React.useState(false)

  const modalRef = useRef()

  const onChange = (media) => {
    setImages(media.map(item => item.uri))
  }

  const onSubmit = () => {
    updateMeasurementImages(_images)
    modalRef.current.hide()
  }

  React.useEffect(() => {
    if (check.emptyArray(measurementImages)) {
      setIsEditable(true)
    } else {
      setIsEditable(false)
    }
  }, [measurementImages])

  if (
    userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id ||
    userType === EMPLOYEE_TYPE.SALES_PERSON.id
  ) {
    return (
      <>
        <View>
          <View centerV paddingH-16 paddingT-8 row spread>
            <Text subhead>{t('measurementImages')}</Text>
            <IconButton
              icon='upload'
              onPress={() => modalRef.current.show()}
              color={colors.primary}
            // disabled={!isEditable}
            />
          </View>
          {check.nonEmptyArray(measurementImages) && (
            <ImagePicker
              initialItems={measurementImages}
              onChange={onChange}
              editable={false}
            />
          )}
        </View>
        <Modal
          ref={modalRef}
          style={styles.modal}
          contentContainerStyle={styles.modalContent}
        >
          <View flex>
            <View flex paddingV-16>
              <ImagePicker
                onChange={onChange}
              />
            </View>
            <Button
              label={t('upload')}
              onPress={onSubmit}
              isLoading={networkStatus === NETWORK_STATUS.FETCHING}
            />
          </View>
        </Modal>
      </>
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 180,
    padding: 0
  }
})

export default ImageUploaderRowItem
