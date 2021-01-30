import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import check from 'check-types'

import View from './View'
import Text from './Text'
import UnorderedList from './UnorderedList'

// Example of the shape of the data prop
const DATA = {
  Category: 'a',
  'Services Availed': ['S1', 'S2'],
  'Additional Services Availed': ['AS1', 'AS2'],
  Location: 'b', // address of customer,
  Scheduler: 'c' // booking / delivery time
}

const SummaryView = ({
  data = DATA,
  showBullets = true,
  horizontal = false
}) => {
  if (check.not.assigned(data)) {
    return <></>
  }

  const [_showBullets, setShowBullets] = useState(showBullets)
  const [_horizontal, setHorizontal] = useState(horizontal)

  const Item = ({ title, value }) => {
    return (
      <View flex marginB-16 row={_horizontal} spread={_horizontal}>
        <Text footnote>{title}</Text>
        <View>
          {check.array(value)
            ? value.map((item, index) => <Text key={index} subhead semibold>{item}</Text>)
            : <Text subhead semibold>{value}</Text>}
        </View>
      </View>
    )
  }

  useEffect(() => {
    setShowBullets(showBullets)
    setHorizontal(horizontal)
  }, [])

  return (
    _
      .chain(data)
      .toPairs()
      .map(([title, value], index) => (
        <View key={index}>
          {_showBullets
            ? <UnorderedList><Item title={title} value={value} /></UnorderedList>
            : <Item title={title} value={value} />}
        </View>
      ))
      .value()
  )
}

export default SummaryView
