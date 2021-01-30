import React, { useEffect, useCallback, useState, useRef } from 'react'
import { ScrollView, RefreshControl, Image } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'
import check from 'check-types'

import { Button, View, Modal, Text, TouchableRipple, ModalImageViewer, NoData } from '../Components'
import { Screen, Header, CheckList, FeedbackForm, ChecklistSkeletonContent } from '../Domain'
import viewStyles from '../Styles/ViewStyles'
import { NETWORK_STATUS, ASSIGNMENT_STATUS, EMPLOYEE_TYPE } from '../Constants'
import { t } from 'i18n-js'
import elevationShadowStyle from '../Utils/ShadowStyle'
import Spacings from '../DesignSystem/Spacings'

const CheckListScreen = ({ route }) => {
  const { orderId } = route.params || { orderId: null }

  const {
    fetch,
    update
  } = useStoreActions(actions => ({ ...actions.checkList }))

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))
  const {
    model
  } = useStoreState(state => ({ ...state.orderDetails }))
  const {
    networkStatus,
    message,
    model: { remarks, images, items }
  } = useStoreState(state => ({ ...state.checkList }))

  const [refreshing, setRefreshing] = useState(false)
  const [_items, setItems] = useState([])
  const [_remarks, setRemarks] = useState(null)
  const [_images, setImages] = useState([])
  const [isImageViewerModalVisible, setIsImageViewerModalVisible] = useState(false)
  const [imageViewerIndex, setImageViewerIndex] = useState(0)

  const confirmModalRef = useRef()

  const mode = userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id ||
    EMPLOYEE_TYPE.FITTING_PERSON.id
    ? 'switch'
    : null

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch().then(() => setRefreshing(false))
  }, [])

  const onChangeData = ({ remarks, images }) => {
    setRemarks(remarks)
    setImages(images)
  }

  const areAllItemsOk = () => _items.every(({ isChecked }) => isChecked)

  const onPressVerify = () => {
    confirmModalRef.current.show()
  }

  const onPressMediaItem = (index) => {
    setImageViewerIndex(index)
    setIsImageViewerModalVisible(true)
  }

  const onPressConfirmVerification = () => {
    confirmModalRef.current.hide()
    update({ remarks: _remarks, images: _images, items: _items })
  }

  const shouldDisplayForm = () => {
    if (check.nonEmptyString(remarks)) {
      return false
    }

    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id) {
      return false
    }

    if (areAllItemsOk()) {
      return false
    }

    return true
  }

  const getConfirmationText = () => {
    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id) {
      if (areAllItemsOk()) {
        return t('verifyItemsPhysicallyWarning')
      }

      return t('verifyItemsPhysically')
    }

    if (areAllItemsOk()) {
      return t('verifyItemsWarning')
    }

    return t('verifyItemsAlert')
  }

  const renderSubmitButton = () => {
    if (userType === EMPLOYEE_TYPE.DELIVERY_PERSON.id &&
      Number(stageId) > Number(ASSIGNMENT_STATUS.DELIVERY_CHECK_LIST_VERIFIED.id)) {
      return <></>
    }

    if (userType === EMPLOYEE_TYPE.FITTING_PERSON.id &&
      Number(stageId) > Number(ASSIGNMENT_STATUS.FITTING_CHECK_LIST_VERIFIED.id)) {
      return <></>
    }

    if (check.emptyArray(items)) {
      return <></>
    }

    if (check.nonEmptyString(remarks)) {
      return <></>
    }

    return (
      <View row style={viewStyles.floatingBottomActionBar}>
        <View flex>
          <Button
            label={t('submit')}
            onPress={onPressVerify}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
            disabled={!areAllItemsOk() && check.emptyString(_remarks)}
          />
        </View>
      </View>
    )
  }

  const renderMediaItems = () => {
    if (check.not.array(images) || check.emptyArray(images)) {
      return <></>
    }

    const media = images.map(item => ({
      uri: item,
      freeHeight: true
    }))

    return (
      <>
        <ScrollView
          horizontal
        >
          {media.map((item, index) => (
            <View
              style={[
                styles.item,
                index === 0 && styles.firstItem
              ]}
              key={index}
            >
              <TouchableRipple
                style={styles.thumbnailContainer}
                onPress={() => onPressMediaItem(index)}
              >
                <Image
                  source={{ uri: item.uri }}
                  resizeMode='cover'
                  style={styles.thumbnail}
                />
              </TouchableRipple>
            </View>
          ))}
        </ScrollView>
        <ModalImageViewer
          visible={isImageViewerModalVisible}
          images={media}
          imageIndex={imageViewerIndex}
          onRequestClose={() => setIsImageViewerModalVisible(false)}
        />
      </>
    )
  }

  useEffect(() => {
    fetch({ orderId })
  }, [])

  useEffect(() => {
    if (check.nonEmptyArray(items)) {
      setItems(items)
    }
  }, [items])

  return (
    <Screen
      isLoading={networkStatus === NETWORK_STATUS.FETCHING && orderId !== model.orderId}
      SkeletonComponent={ChecklistSkeletonContent}
    >
      <Header title={`${t('orderNumber')} ${orderNumber}`} subtitle={t('checklist')} />
      <CheckList
        data={_items}
        mode={mode}
        onPressItemSwitch={setItems}
        readonly={check.nonEmptyString(remarks)}
        ListFooterComponent={shouldDisplayForm()
          ? <FeedbackForm onChangeData={onChangeData} />
          : (
            <>
              <View marginT-32 padding-16>
                <Text body>{remarks}</Text>
              </View>
              {renderMediaItems()}
              <View marginB-64 />
            </>)}
        ListEmptyComponent={<NoData text={message} />}
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {renderSubmitButton()}
      <Modal
        ref={confirmModalRef}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <View flex marginT-32>
          <View flex padding-16>
            <Text body>
              {getConfirmationText()}
            </Text>
          </View>
          <Button
            label={t('confirm')}
            onPress={onPressConfirmVerification}
            isLoading={networkStatus === NETWORK_STATUS.FETCHING}
          />
        </View>
      </Modal>
    </Screen>
  )
}

const styles = {
  container: {
    flex: 1,
    flexGrow: 1
  },
  item: {
    alignItems: 'center',
    borderRadius: 4,
    ...elevationShadowStyle({ elevation: 2 }),
    height: 80,
    justifyContent: 'center',
    margin: Spacings.gridGutter / 4,
    overflow: 'hidden',
    width: 80
  },
  firstItem: {
    marginLeft: Spacings.gridGutter
  },
  thumbnailContainer: {
    flex: 1,
    position: 'relative'
  },
  thumbnail: {
    height: 80,
    width: 80
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: 200
  }
}

export default CheckListScreen
