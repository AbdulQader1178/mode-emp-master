import React from 'react'
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native'

import { Icon, TouchableRipple, View } from '../Components'
import { TEXT_INPUT } from '../Components/Text'
import COLORS from '../Constants/Colors'
import useTheme from '../DesignSystem/Context'
import Spacings from '../DesignSystem/Spacings'
import viewStyles from '../Styles/ViewStyles'

const MessagingInputToolbar = ({ onSubmit = () => { }, isSent = true, isLoading = false }) => {
  const { colors } = useTheme()

  const [text, setText] = React.useState('')
  const [_isSent, setIsSent] = React.useState(true)
  const [_isLoading, setIsLoading] = React.useState(false)

  const _onSubmit = () => {
    if (isLoading || text === '') {
      return null
    }

    onSubmit(text)
    setText('')
  }

  React.useEffect(() => {
    if (isSent) {
      setIsSent(true)
    }
  }, [isSent])

  React.useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  React.useEffect(() => {
    if (_isSent) {
      setText('')
    }
  }, [_isSent])

  return (
    <View flex row style={viewStyles.floatingBottomActionBar}>
      <View flex-5 row>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={_onSubmit}
          placeholder='Type something here'
          placeholderTextColor={COLORS.grey600}
          returnKeyType='done'
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text
            }
          ]}
        />
      </View>
      <View flex>
        <TouchableRipple
          onPress={_onSubmit}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Icon
            type='Fontisto'
            name='paper-plane'
            color={colors.text}
            style={{ opacity: !_isLoading ? 1 : 0.5 }}
          />
        </TouchableRipple>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    ...TEXT_INPUT,
    borderRadius: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    height: 60,
    paddingHorizontal: Spacings.gridGutter,
    width: '100%'
  },
  button: {
    alignItems: 'center',
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    height: 60,
    justifyContent: 'center'
  }
})

export default MessagingInputToolbar
