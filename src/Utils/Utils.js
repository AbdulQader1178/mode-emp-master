import RNFetchBlob from 'rn-fetch-blob'
import check from 'check-types'
import moment from 'moment'

import { CALENDAR_DATE_FORMAT } from '../Constants'

export const formattedMoney = (number) => Number(number).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,').split('.')[0]

export const getFileExtensionFromUrl = (filename) => {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined
}

export const downloadFile = (url, path) => {
  var date = new Date()
  var ext = getFileExtensionFromUrl(url)
  ext = '.' + ext[0]
  const { config, fs } = RNFetchBlob
  const PictureDir = path || fs.dirs.PictureDir
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true
      // path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
      // description: 'Image'
    }
  }
  RNFetchBlob
    .config(options)
    .fetch('GET', url).then((res) => {
      alert('Success Downloaded')
    })
}

export const urlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const imageExtension = url.split('.').pop()
    const mime = imageExtension === 'jpg'
      ? 'image/jpeg'
      : `image/${imageExtension}`
    let imagePath = null
    RNFetchBlob.config({
      fileCache: true
    })
      .fetch('GET', url)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path()
        return resp.readFile('base64')
      })
      .then(base64Data => {
        // remove the file from storage
        RNFetchBlob.fs.unlink(imagePath)
        // here's base64 encoded image
        resolve(`data:${mime};base64,${base64Data}`)
      })
  })
}

export const enumerateDaysBetweenDates = function (startDate, endDate, outputDateFormat) {
  const now = moment(startDate).clone()
  const dates = []

  while (now.isSameOrBefore(moment(endDate))) {
    dates.push(now.format(outputDateFormat || 'YYYY-MM-DD'))
    now.add(1, 'days')
  }
  return dates
}

export const enumerateEventsByDate = (acc, cur, idx, src) => {
  const startDate = moment(cur.startDate)
  const endDate = moment(cur.endDate)
  const dateRun = startDate.clone()

  while (dateRun.isSameOrBefore(endDate)) {
    acc.push({
      date: dateRun.format(CALENDAR_DATE_FORMAT),
      data: {
        ...cur,
        startingDay: dateRun.isSame(startDate),
        endingDay: dateRun.isSame(endDate)
      }
    })
    dateRun.add(1, 'days')
  }

  return acc.sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
}

export const groupEventsByDate = (acc, currentItem, idx, src) => {
  const { date, data } = currentItem
  const isDatePresentInAccumulator = check.emptyArray(acc)
    ? false
    : acc.some(item => item.date === date)

  // find if the date is already saved in the accumulator
  if (!isDatePresentInAccumulator) {
    // if not already saved, add the date and a 'data' list containing the single current item into the accumulator
    acc.push({ date, data: [data] })
  } else {
    // if already saved, then find the item whose date matches the date and add the current item into the 'data' field
    acc.find(item => item.date === date).data.push(data)
  }

  return acc
}

export const enumerateTimeDuration = (minute) => {
  const items = []
  new Array(24).fill().forEach((acc, index) => {
    items.push(moment({ hour: index }).format('HH:mm'))
    items.push(moment({ hour: index, minute: minute || 30 }).format('HH:mm'))
  })
  return items
}

export const enumerateTimePairs = (minute) => {
  const items = enumerateTimeDuration(minute)

  const createPairs = (acc, cur, idx, src) => {
    if (acc.length === 0) {
      acc.push([cur])
    } else {
      acc.push([cur])
      acc[idx - 1].push(cur)
    }

    if (idx === src.length - 1) {
      acc[idx].push(acc[0][0])
    }

    return acc
  }

  return items.reduce(createPairs, [])
}

export const getQueryStringFromObject = (params) => Object.keys(params).map(key => key + '=' + params[key]).join('&')
