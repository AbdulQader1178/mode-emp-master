import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import _ from 'lodash'
import check from 'check-types'

import { View, Text, TouchableRipple, Icon } from '.'
import COLORS from '../Constants/Colors'
import useTheme from '../DesignSystem/Context'

/*
Data should have the following shape
*/
// const DATA = [
//   { name: "Movies", header: true },
//   { name: "Interstellar", header: false },
//   { name: "Dark Knight", header: false },
//   { name: "Pop", header: false },
//   { name: "Pulp Fiction", header: false },
//   { name: "Burning Train", header: false },
//   { name: "Music", header: true },
//   { name: "Adams", header: false },
//   { name: "Nirvana", header: false },
//   { name: "Amrit Maan", header: false }
// ]

const StickyHeaderList = ({ data, onPressItem }) => {
  const [_data, setData] = useState([])
  const [stickyHeaderIndices, setStickyHeaderIndices] = useState([])

  const renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ItemHeader data={item} />
      )
    }
    return (
      <Item data={item} onPress={onPressItem} />
    )
  }

  useEffect(() => {
    if (check.nonEmptyArray(data)) {
      setData(data.map(item => ({
        ...item,
        header: check.not.assigned(item.parentId)
      })))
    }
  }, [data])

  useEffect(() => {
    var arr = []
    _data.map(item => {
      if (item.header) {
        arr.push(_data.indexOf(item))
      }
    })
    arr.push(0)
    setStickyHeaderIndices(arr)
  }, [_data])

  return (
    <View flex>
      <FlatList
        data={_data}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

const ItemHeader = ({ data: { name } }) => {
  return (
    <View paddingV-4 paddingH-16>
      <Text subhead>{name}</Text>
    </View>
  )
}

const Item = ({ data, onPress }) => {
  const { colors } = useTheme()

  const { name, description, serving } = data

  return (
    <TouchableRipple
      onPress={() => onPress ? onPress(data) : null}
      style={{ backgroundColor: colors.background }}
    >
      <View row spread centerV paddingV-16 paddingH-16>
        <View>
          <Text body>{name}</Text>
          <Text footnote>{description}</Text>
          {serving && (
            <View left marginT-6>
              <View bg-green20 paddingH-6 paddingV-2 br10>
                <Text caption2 semibold style={{ color: COLORS.white }}>LISTED</Text>
              </View>
            </View>
          )}
        </View>
        {onPress && (
          <View right width={60}>
            <Icon type='SimpleLineIcons' name='arrow-right' size={10} color={COLORS.grey600} />
          </View>
        )}
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 60
  }
})

export default StickyHeaderList
