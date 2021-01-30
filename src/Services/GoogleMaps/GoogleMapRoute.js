import { useCallback, useState } from 'react'

const useMapRoute = ({
  apiKey = '',
  mode = 'driving' // 'walking'
}) => {
  const [coords, setCooords] = useState([])

  const updateRoute = useCallback((originLatLng, destinationLatLng) => {
    const origin = `${originLatLng.latitude},${originLatLng.longitude}`
    const destination = `${destinationLatLng.latitude},${destinationLatLng.longitude}`
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&mode=${mode}`

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          setCooords(
            decode(responseJson.routes[0].overview_polyline.points) // definition below
          )
        }
      }).catch(e => { console.warn(e) })
  }, [coords])

  const getAddressFromCoordinates = (latLng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.latitude},${latLng.longitude}&key=${apiKey}`

    return new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
      // In this example, we use setTimeout(...) to simulate async code. 
      // In reality, you will probably be using something like XHR or an HTML5 API.
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data.results[0].formatted_address))
        .catch(error => reject(error))
    })
  }

  return ({
    updateRoute,
    getAddressFromCoordinates,
    coordinates: coords
  })
}

/*
  https://github.com/react-native-community/react-native-maps/issues/929#issuecomment-271365235
 */
const decode = (t, e) => {
  for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0,
    a = null, c = Math.pow(10, e || 5);
    u < t.length
    ;
  ) {
    a = null, h = 0, i = 0

    do { a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; }
    while (a >= 32)

    n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0

    do { a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; }
    while (a >= 32)

    o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o,
      d.push([l / c, r / c])
  }
  return d.map(
    function (t) {
      return { latitude: t[0], longitude: t[1] }
    })
}

export default useMapRoute
