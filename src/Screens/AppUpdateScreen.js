import React, { useContext } from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-elements'
import AppStateContext from '../Services/Auth/AppContext'
import { Container, LoadingActionContainer } from '../Components'
import COLORS from '../Constants/Colors'

const AppUpdateScreen = () => {
  const { state, logout } = useContext(AppStateContext)

  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 24, color: COLORS.cyan700 }}>
          APP UPDATE SCREEN
        </Text>

        <Button style={{ marginTop: 20 }}>SAY HELLO !</Button>
      </Container>
    </LoadingActionContainer>
  )
}

export default AppUpdateScreen
