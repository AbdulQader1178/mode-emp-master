import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, Platform, StyleSheet } from 'react-native'
import { default as Permissions, PERMISSIONS, RESULTS } from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import check from 'check-types'

import View from './View'
import useTranslation from '../i18n'
import useMapRoute from '../Services/GoogleMaps/GoogleMapRoute'
import { GOOGLE_GEO_API_KEY } from '../Config'

const MARKER_IMAGE_SIZE = 30
const mapStyle = require('../../map-style.json')
const originMarkerImage = require('../../assets/images/map_marker_origin.png')
const movingMarkerImage = require('../../assets/images/map_delivery_marker.png')
const destinationMarkerImage = require('../../assets/images/map_marker_destination.png')
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421
const options = {
  enableHighAccuracy: true,
  timeout: 5000
}
const initialLocation = {
  latitude: null, longitude: null
}

const granted = (statuses) => Object.values(statuses)
  .some(status => status === RESULTS.GRANTED)

const denied = (statuses) => Object.values(statuses)
  .every(status => status === RESULTS.DENIED)

const Map = ({
  showsUserLocation = true,
  isLocationTrackingEnabled = true,
  isRegionTrackingEnabled = false,
  isRouteEnabled = true,
  // coordinates = { latitude: 0, longitude: 0 },
  sourceCoordinates,
  destinationCoordinates,
  onChangePosition = () => { },
  onRegionChangeComplete = () => { },
  ...rest
}) => {
  const { t } = useTranslation()
  const {
    updateRoute,
    getAddressFromCoordinates,
    coordinates: routeCoordinates
  } = useMapRoute({ apiKey: GOOGLE_GEO_API_KEY })

  // const [_coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
  const [_sourceCoordinates, setSourceCoordinates] = useState(initialLocation)
  const [_destinationCoordinates, setDestinationCoordinates] = useState(initialLocation)
  const [region, setRegion] = useState(initialLocation)
  const [markers, setMarkers] = useState([])
  const [sourceMarkerAddress, setSourceMarkerAddress] = useState('')
  const [destinationMarkerAddress, setDestinationMarkerAddress] = useState('')
  const [regionMarkerAddress, setRegionMarkerAddress] = useState('')
  const [watchId, setWatchId] = useState(null)
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  })
  // console.log(
  //   '\n',
  //   'Current Coordinates', position,
  //   '\n',
  //   'Source Coordinates', _sourceCoordinates,
  //   '\n',
  //   'Destination Coordinates', _destinationCoordinates
  // )
  const mapRef = useRef()

  const checkPermissions = React.useCallback(async () => {
    return Permissions.checkMultiple(
      Platform.select({
        ios: [
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        ],
        android: [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        ]
      })
    )
  })

  const requestPermissions = React.useCallback(async () => {
    return Permissions.requestMultiple(
      Platform.select({
        ios: [
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        ],
        android: [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        ]
      })
    )
  })

  const showGoToSettingsAlert = () => {
    Alert
      .alert(
        t('locationPermissionBlocked'),
        t('appUnusableWithoutLocation'),
        [
          {
            type: 'cancel',
            text: t('noThanks')
          },
          {
            text: t('goToSettings'),
            onPress: () => Permissions
              .openSettings()
              .catch(() => console.warn('cannot open settings'))
          }
        ]
      )
  }

  const updatePosition = (newPosition) => {
    const currentCoordinates = {
      latitude: parseFloat(newPosition.coords.latitude),
      longitude: parseFloat(newPosition.coords.longitude)
    }
    setPosition({
      ...currentCoordinates,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })

    onChangePosition(currentCoordinates)
  }

  const initPosition = async () => {
    Geolocation.getCurrentPosition(position => {
      updatePosition(position)
    }, err => {
      console.log('Location off', JSON.stringify(err))
    }, options)
  }

  const watchPosition = React.useCallback(async () => {
    const watchId = Geolocation.watchPosition(position => {
      updatePosition(position)
    }, err => {
      Alert
        .alert(t('locationPermissionDenied'), JSON.stringify(err))
    }, options)

    setWatchId(watchId)
  }, [position])

  const onRegionChange = (region) => {
    setRegion(region)
  }

  const _onRegionChangeComplete = (region) => {
    setRegion(region)
    getAddressFromCoordinates(region)
      .then(address => {
        onRegionChangeComplete({ location: region, address })
      })
  }

  const fitMarkersWithinScreenBounds = () => {
    mapRef.current.fitToSuppliedMarkers(
      ['mk0', 'mk1', 'mk2'],
      {
        edgePadding:
        {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        }
      })
  }

  const onReady = () => {
    setTimeout(() => {
      fitMarkersWithinScreenBounds()
    }, 2000)
  }

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <MapView.Marker
        key={index}
        coordinate={marker.latlng}
        identifier={marker.markerId}
      >
        <CustomMarker markerId={marker.markerId} />
      </MapView.Marker>
    ))
  }

  const renderRoute = () => {
    if (!isRouteEnabled) return <></>

    return (
      <MapView.Polyline
        coordinates={routeCoordinates}
        strokeWidth={4}
      />
    )
  }

  useEffect(() => {
    if (
      check.assigned(sourceCoordinates) &&
      check.assigned(sourceCoordinates.latitude) &&
      check.assigned(sourceCoordinates.longitude) &&
      check.number(parseFloat(sourceCoordinates.latitude)) &&
      check.number(parseFloat(sourceCoordinates.longitude))
    ) {
      const coordinates = {
        latitude: parseFloat(sourceCoordinates.latitude),
        longitude: parseFloat(sourceCoordinates.longitude)
      }
      setSourceCoordinates(coordinates)
      fitMarkersWithinScreenBounds()
    }

    if (
      check.assigned(destinationCoordinates) &&
      check.assigned(destinationCoordinates.latitude) &&
      check.assigned(destinationCoordinates.longitude) &&
      check.number(parseFloat(destinationCoordinates.latitude)) &&
      check.number(parseFloat(destinationCoordinates.longitude))
    ) {
      const coordinates = {
        latitude: parseFloat(destinationCoordinates.latitude),
        longitude: parseFloat(destinationCoordinates.longitude)
      }
      setDestinationCoordinates(coordinates)
      fitMarkersWithinScreenBounds()
    }

    if (showsUserLocation) {
      checkPermissions()
        .then((statuses) => {
          if (granted(statuses)) {
            initPosition()
          } else {
            requestPermissions()
              .then((statuses) => {
                if (granted(statuses)) {
                  initPosition()
                } else {
                  showGoToSettingsAlert()
                }
              })
          }
        })
    }

    if (isLocationTrackingEnabled) {
      checkPermissions()
        .then((statuses) => {
          if (granted(statuses)) {
            initPosition()
            watchPosition()
          } else {
            requestPermissions()
              .then((statuses) => {
                if (granted(statuses)) {
                  initPosition()
                  watchPosition()
                } else {
                  showGoToSettingsAlert()
                }
              })
          }
        })

      return () => Geolocation.clearWatch(watchId)
    }
  }, [sourceCoordinates, destinationCoordinates])

  useEffect(() => {
    if (isRouteEnabled) {
      updateRoute(position, _destinationCoordinates)
    }

    let markers = []

    if (isLocationTrackingEnabled) {
      markers = [
        { latlng: _sourceCoordinates },
        { latlng: position },
        { latlng: _destinationCoordinates }
      ]
        .filter(({ latlng: { latitude, longitude } }) => (
          check.assigned(latitude) && check.assigned(longitude)
        ))
        .map((item, i) => ({ ...item, markerId: `mk${i}` }))
    }

    if (isRegionTrackingEnabled) {
      if (
        check.assigned(region.latitude) &&
        check.assigned(region.longitude)
      ) {
        markers = [{ latlng: region }]
      } else {
        markers = [{ latlng: position }]
      }

      markers = markers
        .map((item, i) => ({ ...item, markerId: `mk${i}` }))
    }

    setMarkers(markers)
  }, [position, region])

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showsUserLocation}
        // region={region}
        onMapReady={onReady}
        onRegionChange={onRegionChange}
        customMapStyle={mapStyle}
        style={{ ...StyleSheet.absoluteFillObject }}
        {...rest}
        onRegionChangeComplete={_onRegionChangeComplete}
      >
        {renderMarkers()}
        {renderRoute()}
      </MapView>
      {/* <View paddingH-16 paddingV-8 row spead>
        <Text caption1>{sourceLocationAddress}</Text>
        <Text>-</Text>
        <Text caption1>{destinationLocationAddress}</Text>
      </View> */}
    </>
  )
}

const CustomMarker = ({ markerId }) => {
  let _image = ''

  if (markerId === 'mk1') {
    _image = movingMarkerImage
  } else if (markerId === 'mk0') {
    _image = originMarkerImage
  } else {
    _image = destinationMarkerImage
  }

  return (
    <View>
      <Image
        source={_image}
        style={{
          height: MARKER_IMAGE_SIZE,
          width: MARKER_IMAGE_SIZE
        }}
        resizeMode='contain'
      />
    </View>
  )
}

export default Map
