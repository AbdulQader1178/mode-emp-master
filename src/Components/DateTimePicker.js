import React from 'react'
import { Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { View, Text } from '.'
import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'
import moment from 'moment'

const timeArray = [
  { id: 0, time: '8 am' }, { id: 1, time: '10 am' }, { id: 2, time: '12 pm' },
  { id: 3, time: '2 pm' }, { id: 4, time: '4 pm' }, { id: 5, time: '6 pm' }, { id: 6, time: '8 pm' }
]
const { width } = Dimensions.get('window')
var boxingDay = new Date()
var nextWeek = boxingDay * 1 + 10 * 24 * 3600 * 1000
function getDates (startDate, stopDate) {
  var dateArray = []
  var currentDate = moment(startDate)
  var stopDate = moment(stopDate)
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('MMM-Do-YYYY'))
    currentDate = moment(currentDate).add(1, 'days')
  }
  return dateArray
}

const renderRow = (row, id) => {
  return (
    <TouchableOpacity
      style={styles.item}
    >
      <Text style={{ color: COLORS.grey800 }}>{row.date}</Text>
      <Text style={{ color: COLORS.grey800 }}>{row.month}</Text>
    </TouchableOpacity>
  )
}
const renderRowTime = (row, id) => {
  return (
    <TouchableOpacity
      style={styles.item}
    >
      <Text style={{ color: COLORS.grey800 }}>{row.time}</Text>
    </TouchableOpacity>
  )
}
const DateTimePicker = () => {
  var array = []
  var dataArray = getDates(boxingDay, nextWeek)
  dataArray.map((item, index) => {
    var fields = item.split(/-/)
    var monthValue = fields[0]
    var dateValue = fields[1]
    array.push({ month: monthValue, date: dateValue })
  })

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={array}
        renderItem={({ item, index }) => renderRow(item, index)}
        nestedScrollEnabled
        horizontal
      />
      <FlatList
        data={timeArray}
        renderItem={({ item, index }) => renderRowTime(item, index)}
        nestedScrollEnabled
        horizontal
      />
    </View>
  )
}
const styles = {
  item: {
    borderRadius: 8,
    height: 80,
    marginVertical: Spacings.gridGutter / 2,
    marginHorizontal: Spacings.gridGutter
    // ...elevationShadowStyle({ elevation: 1 })
  }
}

export default DateTimePicker
