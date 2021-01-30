import React from 'react'
import { FlatList } from 'react-native'

import { View, Text, Icon, Divider, ButtonToggleGroup } from '../Components'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import COLORS from '../Constants/Colors'

const NOT_OK = 0
const OK = 1

const CheckList = ({ data, mode = null, onPressItemSwitch = () => null, readonly = false, ...rest }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const options = [
    { value: NOT_OK, activeColor: colors.warn, label: <Icon type='MaterialCommunityIcons' name='close' size={12} color={colors.text} /> },
    { value: OK, activeColor: colors.success, label: <Icon type='MaterialCommunityIcons' name='check' size={12} color={colors.text} /> }
  ]

  const renderItem = ({ item, index }) => {
    const { id, position, description, quantity, acknowledgementNo, articleNo, isChecked } = item

    const _onPressItemSwitch = (value) => {
      const dataModified = data.map(item => {
        if (item.id === id) {
          return { ...item, isChecked: value === OK }
        }

        return item
      })

      onPressItemSwitch(dataModified)
    }

    const renderSwitch = () => {
      if (!mode) {
        return <></>
      }

      return (
        <>
          <View height={30} width={60}>
            <ButtonToggleGroup
              options={options}
              initial={isChecked ? OK : NOT_OK}
              hasPadding
              height={30}
              borderColor={COLORS.grey400}
              onPress={_onPressItemSwitch}
              disabled={readonly}
            />
          </View>
          <Divider vertical />
        </>
      )
    }

    return (
      <>
        {index !== 0 && <Divider line />}
        <View paddingH-16>
          <View paddingV-16 row spread top>
            <View centerV flex row>
              {renderSwitch()}
              <View>
                <Text subhead style={{ color: COLORS.grey400 }}>
                  {description}
                </Text>
                <View marginT-8 row>
                  <View>
                    <Text caption2>{t('acknowledgment')}</Text>
                    <Text footnote>{acknowledgementNo}</Text>
                  </View>
                  <Divider vertical line />
                  <View>
                    <Text caption2>{t('article')}</Text>
                    <Text footnote>{articleNo}</Text>
                  </View>
                  <Divider vertical line />
                  <View>
                    <Text caption2>{t('position')}</Text>
                    <Text footnote>{position}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View centerV right row width={100}>
              <Icon type='MaterialCommunityIcons' name='close' size={12} color={colors.text} />
              <Divider small vertical />
              <Text body>
                {quantity}
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={<Divider />}
      {...rest}
    />
  )
}

export default CheckList
