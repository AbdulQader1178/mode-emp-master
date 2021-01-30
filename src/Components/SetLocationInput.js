import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

import View from './View'
import Text from './Text'
import Icon from './Icon'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'
import { Divider } from '.'

const SetLocationInput = ({
  initialValue,
  onChange
}) => {
  const { colors } = useTheme()

  const [coordPair, setCoordPair] = useState(initialValue || { lat: null, lng: null })

  const { lat, lng } = coordPair

  async function getCurrentPosition () {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000
      }

      try {
        Geolocation.getCurrentPosition(position => {
          setCoordPair({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          })
        }, err => {
          console.log('Location off', JSON.stringify(err))
        }, options)
      } catch (err) {
        Alert
          .alert(t('locationPermissionDenied'), JSON.stringify(err))
      }
    }
  }

  const renderTrigger = () => {
    return (
      <TouchableOpacity onPress={() => getCurrentPosition()}>
        <View row spread centerV paddingV-12>
          {lat && lng
            ? (
              <>
                <Text body>{`${lat.toString()}, ${lng.toString()}`}</Text>
                <View row centerV>
                  <Text caption2>Change</Text>
                  <Divider small vertical />
                  <Icon type='Ionicons' name='md-locate' color={COLORS.orange400} />
                </View>
              </>
            )
            : (
              <>
                <Text body>Set Current Location</Text>
                <Icon type='Ionicons' name='md-locate' color={COLORS.orange400} />
              </>
            )}
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (onChange) {
      onChange(coordPair)
    }
  }, [coordPair])

  return (
    <View>
      <View style={[
        styles.inputContainer,
        { borderBottomColor: colors.primary }
      ]}
      >
        {renderTrigger()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  inputContainer: {
    borderBottomWidth: 1
  }
})

export default SetLocationInput
