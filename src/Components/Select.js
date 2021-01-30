import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

import { View, Text, Divider, IconButton, Modal, TouchableRipple, NoData } from '../Components'
import Input from './Input'
import Icon from './Icon'
import useTheme from '../DesignSystem/Context'
import COLORS from '../Constants/Colors'

const Select = ({
  label,
  options = [],
  modalTitle,
  onSelect = () => { },
  onModalShow = () => { },
  onModalHide = () => { },
  isLoading = false
}) => {
  const { colors } = useTheme()

  const [selectedOption, setSelectedOption] = React.useState({
    id: null,
    title: null
  })
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const modalRef = React.useRef()

  const _onModalHide = () => {
    onModalHide()
    setIsModalVisible(false)
  }

  const _onPressItem = (option) => {
    onSelect(option)
    setSelectedOption(option)
    modalRef.current.hide()
  }

  React.useEffect(() => {
    if (isModalVisible) {
      modalRef.current.show()
    } else {
      modalRef.current.hide()
    }
  }, [isModalVisible])

  return (
    <>
      <Input
        label={label}
        value={selectedOption.title}
      />
      <TouchableRipple
        onPress={() => isLoading ? null : setIsModalVisible(true)}
        style={styles.selectTriggerOverlay}
      >
        <View centerV flex padding-16 right>
          {isLoading && <ActivityIndicator size={14} color={colors.text} />}
          {!isLoading && <Icon type='EvilIcons' name='chevron-down' color={colors.text} />}
        </View>
      </TouchableRipple>
      <Modal
        ref={modalRef}
        onModalShow={onModalShow}
        onModalHide={_onModalHide}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}
      >
        <View paddingT-16>
          <View centerV row spread>
            <View paddingH-16>
              <Text title3>{modalTitle}</Text>
            </View>
            <IconButton
              icon='close'
              onPress={() => modalRef.current.hide()}
              color={COLORS.grey400}
            />
          </View>
          <View paddingH-16>
            <View height={16} style={{ borderBottomWidth: 1, borderBottomColor: colors.surfaceColor }} />
          </View>
        </View>
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => _onPressItem(item)}
            >
              <View centerV padding-16 row>
                <Text subhead>
                  {item.title}
                </Text>
              </View>
            </TouchableRipple>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<NoData />}
          ListFooterComponent={<Divider large />}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selectTriggerOverlay: {
    // borderWidth: 1,
    // borderColor: 'green',
    flex: 1,
    height: 60,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {

  }
})

export default Select
