import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { Map, View } from '../Components'
import { CustomerProfileRowItem, Header } from '../Domain'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import check from 'check-types'

const LocationTrackingScreen = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    start,
    send
  } = useStoreActions(actions => ({ ...actions.locationTracking }))

  const {
    model: orderDetails
  } = useStoreState(state => ({ ...state.orderDetails }))
  const {
    model: { sourceCoordinates, destinationCoordinates }
  } = useStoreState(state => ({ ...state.locationTracking }))

  const [currentCoordinates, setCurrentCoordinates] = useState({
    latitude: null,
    longitude: null
  })

  const onChangePosition = ({ latitude, longitude }) => {
    setCurrentCoordinates({ latitude, longitude })
  }

  useEffect(() => {
    if (
      check.assigned(currentCoordinates.latitude) &&
      check.assigned(currentCoordinates.longitude)
    ) {
      if (
        check.not.assigned(sourceCoordinates.latitude) &&
        check.not.assigned(sourceCoordinates.longitude)
      ) {
        start({ sourceCoordinates: currentCoordinates })
      } else {
        send({ currentCoordinates })
      }
    }
  }, [sourceCoordinates, currentCoordinates])

  return (
    <View flex>
      <Header
        title={`${t('orderNumber')} ${orderDetails.orderNumber || ''}`}
      />
      <View flex>
        <Map
          onChangePosition={onChangePosition}
          sourceCoordinates={sourceCoordinates}
          destinationCoordinates={destinationCoordinates}
        // sourceCoordinates={{ latitude: 22.5852, longitude: 88.2839 }}
        // destinationCoordinates={{ latitude: 22.4430, longitude: 88.4305 }}
        // sourceCoordinates={{ latitude: 37.3319485736, longitude: -121.928672791 }}
        // destinationCoordinates={{ latitude: 37.4008464376, longitude: -122.109947205 }}
        />
      </View>
      <View paddingH-16 paddingV-8 style={{ backgroundColor: colors.background }}>
        <CustomerProfileRowItem
          data={orderDetails}
          hasBottomLineDivider={false}
        />
      </View>
    </View>
  )
}

export default LocationTrackingScreen
