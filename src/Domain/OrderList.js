import React, { useEffect, useState, useCallback } from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { Tab, Tabs } from 'native-base'
import { useStoreState } from 'easy-peasy'

import { View, NoData } from '../Components'
import OrderListItem from './OrderListItem'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import navStyles from '../Styles/NavigationStyles'
import { EMPLOYEE_TYPE, LOCALES, ASSIGNMENT_TYPE_TAB_ITEMS } from '../Constants'

const OrderList = ({ data, onRefresh }) => {
  const { colors } = useTheme()
  const { localeProvider } = useTranslation()

  const {
    userType
  } = useStoreState(state => ({ ...state.user }))
  const {
    currentDayData,
    upcomingData
    // assignmentCompletedData
  } = useStoreState((state) => ({ ...state.orderList }))

  const [refreshing, setRefreshing] = useState(false)

  const tabItems = ASSIGNMENT_TYPE_TAB_ITEMS

  const _onRefresh = useCallback(() => {
    if (onRefresh) {
      setRefreshing(true)
      onRefresh().then(() => setRefreshing(false))
    }
  }, [])

  const List = ({ data = [] }) => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <OrderListItem data={item} index={index} onRefresh={onRefresh} />
        )}
        keyExtractor={(item) => item.orderId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={[{backgroundColor:colors.background}]}
        ListFooterComponent={<View height={60} />}
        ListEmptyComponent={
          <NoData text='No assignments found. Pull to refresh to load assignments, if any.' />
        }
      />
    )
  }

  const TabContent = ({ index }) => {
    let filteredData = []
    /*
      When Arabic language is selected,
      the first tab on the left in English
      becomes the last tab and vice versa
    */
    if (localeProvider.name === LOCALES.ARABIC.name) {
      if (index === 0) {
        filteredData = data
      } else if (index === 1) {
        filteredData = upcomingData
      } else {
        filteredData = currentDayData
      }
    } else {
      if (index === 0) {
        filteredData = currentDayData
      } else if (index === 1) {
        filteredData = upcomingData
      } else {
        filteredData = data
      }
    }

    return <List data={filteredData} />
  }

  const render = () => {
    // No tabs needed for Sales and Measurement Persons
    if (
      userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id ||
      userType === EMPLOYEE_TYPE.SALES_PERSON.id
    ) {
      return <List data={data} />
    }

    return (
      <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.primary }}>
        {tabItems.map((tab, index) => (
          <Tab
            heading={tab[localeProvider.name].toUpperCase()}
            tabStyle={{ backgroundColor: colors.surface }}
            activeTabStyle={{ backgroundColor: colors.surface }}
            textStyle={{ ...navStyles.tabTextStyle, color: colors.text }}
            activeTextStyle={{
              ...navStyles.activeTabTextStyle,
              color: colors.text
            }}
            key={index}
          >
            <TabContent index={index} />
          </Tab>
        ))}
      </Tabs>
    )
  }

  useEffect(() => {
    // dispatch({ type: 'setSelectedIndex', payload: currentIndex })
  }, [data])

  return (
    <View flex>
      {render()}
    </View>
  )
}

export default OrderList
