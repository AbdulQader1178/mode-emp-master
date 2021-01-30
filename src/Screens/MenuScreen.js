import React from 'react'
import { StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useStoreState } from 'easy-peasy'
import _ from 'lodash'

import { View, Divider, Icon, Avatar, Text, ProfileImage } from '../Components'
import { Routes } from '../Navigation'
import viewStyles from '../Styles/ViewStyles'
import useAuth from '../Services/Auth'
import COLORS from '../Constants/Colors'

const { width } = Dimensions.get('screen')

const MenuScreen = ({ navigation }) => {
  const { logout } = useAuth()

  const { vendorType, providerType, logo, firstName, lastName, phone } = useStoreState(state => ({ ...state.user.model }))

  const renderMenuItems = () => (
    <>
      <MenuItem
        title='Home'
        icon='home'
        iconType='Feather'
        onPressItem={() => navigation.navigate(Routes.HOME_SCREEN)}
      />
      <MenuItem
        title='Orders for You'
        icon='ios-cart'
        iconType='Ionicons'
        onPressItem={() => navigation.navigate(Routes.ORDER_LIST_SCREEN)}
      />
      <MenuItem
        title='Wallet'
        icon='wallet'
        iconType='Entypo'
        onPressItem={() => navigation.navigate(Routes.WALLET_SCREEN)}
      />
      <MenuItem
        title='Earnings'
        icon='graph-bar'
        iconType='Foundation'
        onPressItem={() => navigation.navigate(Routes.EARNINGS_SCREEN)}
      />
      {/* <Divider line />
      <MenuItem
        title='Subscriptions'
        icon='money'
        iconType='FontAwesome'
        onPressItem={() => navigation.navigate(Routes.ORDER_LIST_SCREEN)}
      /> */}
      {/* <MenuItem
        title='Notifications'
        icon='ios-notifications-outline'
        iconType='Ionicons'
        onPressItem={() => navigation.navigate(Routes.ORDER_LIST_SCREEN)}
      /> */}
      {providerType !== 'products' && (
        <>
          <Divider line />
          <MenuItem
            title='Manage Services'
            icon='ios-list'
            iconType='Ionicons'
            onPressItem={() => navigation.navigate(Routes.CATEGORY_LIST_SCREEN)}
          />
        </>
      )}
      {providerType !== 'services' && (
        <>
          <Divider line />
          <MenuItem
            title='Store Profile'
            icon='store'
            iconType='MaterialCommunityIcons'
            onPressItem={() => navigation.navigate(Routes.STORE_PROFILE_SCREEN)}
          />
          <MenuItem
            title='Manage Products'
            icon='ios-list'
            iconType='Ionicons'
            onPressItem={() => navigation.navigate(Routes.PRODUCT_LIST_SCREEN)}
          />
        </>
      )}
      {vendorType === 'employer' && (
        <>
          <Divider line />
          <MenuItem
            title='Manage Employees'
            icon='ios-people'
            iconType='Ionicons'
            onPressItem={() => navigation.navigate(Routes.EMPLOYEE_LIST_SCREEN)}
          />
        </>
      )}
      <Divider line />
      <MenuItem
        title='Account'
        icon='profile'
        iconType='EvilIcons'
        onPressItem={() => navigation.navigate(Routes.ACCOUNT_SCREEN)}
      />
      <MenuItem
        title='Logout'
        icon='logout'
        iconType='MaterialCommunityIcons'
        onPressItem={logout}
      />
    </>
  )

  return (
    <View flex>
      <ScrollView>
        <View row spread paddingH-16 paddingT-60 paddingB-16>
          <View flex row centerV>
            <View marginR-16>
              <ProfileImage source={logo} size={50} />
            </View>
            <View flex>
              <Text subhead numberOfLines={1}>{`${firstName} ${lastName}`}</Text>
              <Text footnote semibold>{vendorType ? _.capitalize(vendorType) : ''}</Text>
              <Text caption1>{phone}</Text>
            </View>
          </View>
        </View>
        {/* <View flex-2 center style={{ height: 220, backgroundColor: '#2f3030' }}>
          <Avatar size={80} source={require('../../../assets/images/feat4.png')} />
          <View marginT-15><Text white title3>James Smith</Text></View>
          <View center style={styles.positionButtonStyle}>
            <Text bold footnote white>CLASSIC PLAN</Text>
          </View>
        </View>
        <View flex-1 row spread marginT-30>
          <View center style={styles.cardsStyles}>
            <Text title3 semibold>4.89</Text>
            <Text style={{ fontSize: 9, color: COLORS.grey700 }}>AVG. RATING</Text>
          </View>
          <View center style={styles.cardsStyles}>
            <Text title3 semibold>1021</Text>
            <Text style={{ fontSize: 9, color: COLORS.grey700 }}>FEEDBACKS</Text>
          </View>
          <View center style={styles.cardsStyles}>
            <Text title3 semibold>53</Text>
            <Text style={{ fontSize: 9, color: COLORS.grey700 }}>REVIEWS</Text>
          </View>
        </View> */}
        {renderMenuItems()}
      </ScrollView>
    </View>
  )
}

const MenuItem = ({ icon, iconOrigin, title, onPressItem, iconType }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.closeDrawer())
        onPressItem()
      }}
      style={styles.menuItem}
    >
      <View paddingH-32 paddingV-12>
        <View flex row>
          {/* <View center flex={0.1} style={{ width:50}}>
            <Icon type={iconType} name={icon} color={COLORS.grey600} />
          </View> */}
          <Divider small />
          <View center flex={0.9}>
            <Text subhead style={{ color: COLORS.grey600 }}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    ...viewStyles.mainContainer
  },
  logoContainer: {
    height: 80,
    width: 200
  },
  // https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d
  logo: {
    alignSelf: 'stretch',
    flex: 1,
    width: undefined,
    height: undefined
  },
  positionButtonStyle: {
    height: 35,
    width: width / 3,
    backgroundColor: COLORS.blue900,
    position: 'absolute',
    bottom: -15,
    left: width / 4.5,
    borderRadius: 18
  },
  cardsStyles: {
    height: width / 4,
    width: width / 4,
    // borderRadius: 8,
    marginBottom: 10
  }
})

export default MenuScreen
