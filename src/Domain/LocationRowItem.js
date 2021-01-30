import React, { useRef } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import openMap from 'react-native-open-maps'
import { useStoreActions, useStoreState } from 'easy-peasy'
import check from 'check-types'

import { View, Text, Divider, Icon, IconButton, Modal, Button, Map } from '../Components'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import { EMPLOYEE_TYPE } from '../Constants'

const { height } = Dimensions.get('window')

const initialLocation = {
  latitude: null, longitude: null
}

const LocationRowItem = ({ hasBottomLineDivider = true }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    updateCustomerLocationCoordinates
  } = useStoreActions(actions => ({ ...actions.orderDetails }))

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))
  const {
    model: { address, location }
  } = useStoreState(state => ({ ...state.orderDetails }))

  const [_location, setLocation] = React.useState(initialLocation)
  const [regionMarkerAddress, setRegionMarkerAddress] = React.useState('')
  const [isLocationAlreadySaved, setIsLocationAlreadySaved] = React.useState(false)

  const locationModalRef = useRef()

  const onPressSaveLocation = () => {
    locationModalRef.current.hide()
    updateCustomerLocationCoordinates(_location)
  }

  const onRegionChangeComplete = ({ location, address }) => {
    setLocation(location)
    setRegionMarkerAddress(address)
  }

  const getText = () => {
    if (check.assigned(address) && check.nonEmptyString(address)) {
      return address
    }

    return t('addressNotSetByCustomer')
  }

  const renderLocationPickerButton = () => {
    if (
      userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id ||
      userType === EMPLOYEE_TYPE.SALES_PERSON.id
    ) {
      return (
        <TouchableOpacity
          // onPress={getCurrentPosition}
          onPress={() => locationModalRef.current.show()}
        >
          <View paddingV-4>
            <Text caption2 style={{ color: colors.primary }}>
              {t('updateLocation')}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const renderOpenLocationOnExternalMapButton = () => {
    if (isLocationAlreadySaved) {
      const latitude = parseFloat(location[0])
      const longitude = parseFloat(location[1])

      return (
        <IconButton
          icon='compass'
          onPress={() => check.array(location)
            ? openMap({ latitude, longitude })
            : null}
          size={24}
          color={colors.primary}
        />
      )
    }

    return (
      <IconButton
        icon='compass'
        size={24}
        color={colors.primary}
        disabled
      />
    )
  }

  React.useEffect(() => {
    if (check.nonEmptyArray(location) &&
      location.every(item => check.number(parseFloat(item)))) {
      setIsLocationAlreadySaved(true)
    }
  }, [location])

  // React.useEffect(() => {
  //   if (
  //     check.assigned(_location.latitude) &&
  //     check.assigned(_location.longitude)
  //   ) {
  //     locationModalRef.current.show()
  //   } else {
  //     locationModalRef.current.hide()
  //   }
  // }, [_location])

  return (
    <>
      <View centerV row spread>
        <View centerV flex row>
          <Icon type='SimpleLineIcons' name='location-pin' color={colors.text} />
          <Divider vertical small />
          <View left>
            <Text subhead>{getText()}</Text>
            {renderLocationPickerButton()}
          </View>
        </View>
        <Divider vertical />
        <View centerV row>
          {renderOpenLocationOnExternalMapButton()}
        </View>
      </View>
      {hasBottomLineDivider && <Divider line />}
      <Modal
        ref={locationModalRef}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      // onBackdropPress={() => null}
      // onBackButtonPress={() => null}
      >
        <Map
          isRouteEnabled={false}
          isLocationTrackingEnabled={false}
          isRegionTrackingEnabled
          onRegionChangeComplete={onRegionChangeComplete}
          showsMyLocationButton
        />
        <View flex centerV row spread style={styles.modalBottomBar}>
          <View flex padding-16>
            <Text caption1 numberOfLines={2}>{regionMarkerAddress}</Text>
          </View>
          <View right padding-16>
            <Button
              label={t('save')}
              small
              onPress={onPressSaveLocation}
              borderRadius={60}
            />
          </View>
        </View>
        {/* <View flex marginT-32>
          <View flex paddingH-32>
            <Text title3>{t('newLocationSet')}</Text>
            <Divider small />
            <Text subhead>{t('saveNewLocation')}</Text>
            <Divider />
            <Button
              onPress={onDismissSetLocation}
              label={t('dismiss')}
              small
              link
            />
          </View>
          <Button
            label={t('save')}
            onPress={onPressSaveLocation}
          />
        </View> */}
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height - 100,
    overflow: 'hidden'
  },
  modalBottomBar: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
})

export default LocationRowItem
