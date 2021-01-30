import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, Divider, Icon, IconButton } from '../Components'
import Routes from '../Navigation/Routes'
import useTheme from '../DesignSystem/Context'
import useTranslation from '../i18n'
import { EMPLOYEE_TYPE } from '../Constants'

const ChecklistRowItem = ({
  userType,
  hasBottomLineDivider = true,
  orderId
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()

  if (userType === EMPLOYEE_TYPE.SALES_PERSON.id) {
    return <></>
  }

  if (userType === EMPLOYEE_TYPE.MEASUREMENT_PERSON.id) {
    return <></>
  }

  return (
    <>
      <View centerV row spread>
        <View centerV row>
          <Icon type='MaterialCommunityIcons' name='format-list-checkbox' color={colors.text} />
          <Divider vertical small />
          <Text subhead>
            {t('checklist')}
          </Text>
        </View>
        <IconButton
          icon='chevron-right'
          onPress={() => navigation.navigate(Routes.CHECK_LIST, { orderId })}
          size={24}
          color={colors.primary}
        />
      </View>
      {hasBottomLineDivider && <Divider line />}
    </>
  )
}

export default ChecklistRowItem
