import React from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { countries } from 'countries-list'
import { useStoreState } from 'easy-peasy'
import check from 'check-types'

import { View, Text, Divider, IconButton, Modal, TouchableRipple, NoData } from '../Components'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import COLORS from '../Constants/Colors'

const { height } = Dimensions.get('screen')

const CountrySelectorModal = ({
  isVisible,
  onPressItem = () => { },
  onHide = () => { }
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    countryCodeList
  } = useStoreState(state => ({ ...state.app }))

  const modalRef = React.useRef()

  const _onPressItem = (countryCode) => {
    onPressItem(countryCode)
    modalRef.current.hide()
  }

  React.useEffect(() => {
    if (isVisible) {
      modalRef.current.show()
    } else {
      modalRef.current.hide()
    }
  }, [isVisible])

  React.useEffect(() => {
    if (check.nonEmptyArray(countryCodeList)) {
      _onPressItem(countryCodeList[0].countryCode)
    }
  }, [countryCodeList])

  return (
    <Modal
      ref={modalRef}
      onModalHide={onHide}
      style={styles.modal}
      contentContainerStyle={styles.modalContent}
    >
      <View paddingT-16>
        <View centerV row spread>
          <View paddingH-16>
            <Text body>{t('selectCountry')}</Text>
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
        data={countryCodeList}
        renderItem={({ item: { countryCode } }) => (
          <TouchableRipple
            onPress={() => _onPressItem(countryCode)}
          >
            <View centerV padding-16 row spread>
              <View centerV row>
                <Text subhead>
                  {countries[countryCode].emoji}
                </Text>
                <Divider vertical />
                <Text subhead>
                  {countries[countryCode].name}
                </Text>
              </View>
              <Text subhead>
                {`+${countries[countryCode].phone}`}
              </Text>
            </View>
          </TouchableRipple>
        )}
        keyExtractor={item => item.countryCode}
        ListEmptyComponent={<NoData />}
        ListFooterComponent={<Divider large />}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: height - 100
  }
})

export default CountrySelectorModal
