import React, { useEffect, useCallback } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import check from 'check-types'

import { View, NoData } from '../Components'
import { Screen, OrderList, BottomBar, SkeletonContent, OrderListSkeletonContent } from '../Domain'
import useTheme from '../DesignSystem/Context'
import { Dimensions, InteractionManager } from 'react-native'
import { NETWORK_STATUS } from '../Constants'

const { width } = Dimensions.get('window')

const HomeScreen = () => {
  const { colors } = useTheme()

  const {
    fetch
  } = useStoreActions(actions => ({ ...actions.orderList }))

  const {
    networkStatus,
    data
  } = useStoreState(state => ({ ...state.orderList }))

  const onRefresh = useCallback(() => {
    return fetch()
  }, [])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      fetch()
    })
  }, [])

  return (
    <View flex>
      <View flex>
        <Screen
          isLoading={networkStatus === NETWORK_STATUS.FETCHING && check.emptyArray(data)}
          SkeletonComponent={OrderListSkeletonContent}
        >
          <View height={30} style={{ backgroundColor: colors.surface }} />
          {check.emptyArray(data)
            ? <NoData />
            : (
              <OrderList
                data={data}
                onRefresh={onRefresh}
              />
            )}
        </Screen>
      </View>
      <BottomBar />
    </View>
  )
}

export default HomeScreen
