import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Routes from './Routes'
import {
  CheckListScreen,
  FeedbackScreen,
  HomeScreen,
  LocationTrackingScreen,
  LoginScreen,
  MessagingScreen,
  OrderDetailsScreen,
  ProfileScreen,
  SearchScreen,
  SettingScreen,
  SignUpScreen,
  VideoPlayerScreen
} from '../Screens'
import { navigationRef, isMountedRef } from '.'
import { APP_STATE } from '../Constants'
import { TEXT_SEMIBOLD } from '../Components/Text'
import useAuth from '../Services/Auth'
import useTheme from '../DesignSystem/Context'

const AppNavigator = () => {
  const { colors } = useTheme()
  const { state } = useAuth()

  const RootStack = createStackNavigator()
  const LoginStack = createStackNavigator()

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.surfaceColor,
      color: colors.textStyle
    },
    headerTintColor: colors.textStyle,
    headerTitleStyle: {
      ...TEXT_SEMIBOLD,
      color: colors.textStyle
    }
  }
  const LoginStackScreen = () => {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen
          name={Routes.LOGIN_SCREEN}
          component={LoginScreen}
          options={{
            ...screenOptions,
            headerShown: false
          }}
        />
        <LoginStack.Screen
          name={Routes.SIGN_UP_SCREEN}
          component={SignUpScreen}
          options={{
            ...screenOptions,
            headerShown: false
          }}
        />
      </LoginStack.Navigator>
    )
  }

  useEffect(() => {
    return () => (isMountedRef.current = false)
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isMountedRef.current = true
      }}
    >
      <RootStack.Navigator headerMode='screen'>
        {state === APP_STATE.PRIVATE
          ? (
            <>
              <RootStack.Screen
                name={Routes.HOME_SCREEN}
                component={HomeScreen}
                options={{
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.ORDER_DETAILS_SCREEN}
                component={OrderDetailsScreen}
                options={{
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.MESSAGING_SCREEN}
                component={MessagingScreen}
                options={{
                  ...screenOptions,
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.PROFILE}
                component={ProfileScreen}
                options={{
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.SETTING_SCREEN}
                component={SettingScreen}
                options={{
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.SEARCH}
                component={SearchScreen}
                options={{
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.CHECK_LIST}
                component={CheckListScreen}
                options={{
                  ...screenOptions,
                  headerShown: false,
                  title: 'Check List'
                }}
              />
              <RootStack.Screen
                name={Routes.FEEDBACK}
                component={FeedbackScreen}
                options={{
                  ...screenOptions,
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.LOCATION_TRACKING_SCREEN}
                component={LocationTrackingScreen}
                options={{
                  ...screenOptions,
                  headerShown: false
                }}
              />
              <RootStack.Screen
                name={Routes.VIDEO_PLAYER_SCREEN}
                component={VideoPlayerScreen}
                options={{
                  headerShown: false
                }}
              />
            </>
          )
          : (
            <>
              <RootStack.Screen
                name={Routes.AUTH_STACK}
                component={LoginStackScreen}
                options={{
                  headerShown: false
                }}
              />
            </>
          )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
