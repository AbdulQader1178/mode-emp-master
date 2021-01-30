import React from 'react'
import { CommonActions, StackActions } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/drawer'
import Routes from './Routes'

export { Routes }

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop
 */

export const navigationRef = React.createRef()
export const isMountedRef = React.createRef()

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
// function setTopLevelNavigator (navigatorRef) {
//   navigator = navigatorRef
// }

/**
 * Function to navigate to the last route.
 *
 */
function goBack() {
  // console.log("LOG_navigate", routeName, params);
  navigationRef.current.dispatch(CommonActions.goBack())
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.navigate({
        name: routeName,
        params
      })
    )
  }
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params) {
  navigationRef.current.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        CommonActions.navigate({
          routeName,
          params
        })
      ]
    })
  )
}

function popToTop() {
  navigationRef.current.dispatch(
    StackActions.popToTop()
  )
}

function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer())
}

function openDrawer() {
  navigationRef.current.dispatch(DrawerActions.openDrawer())
}

function closeDrawer() {
  navigationRef.current.dispatch(DrawerActions.closeDrawer())
}

const NavigationService = {
  goBack,
  popToTop,
  navigate,
  toggleDrawer,
  openDrawer,
  closeDrawer,
  navigateAndReset
  // setTopLevelNavigator
}

export default NavigationService
