import { StyleSheet, Dimensions } from 'react-native'
import COLORS from '../Constants/Colors'
import metrics from '../DesignSystem/Spacings'
import { human } from 'react-native-typography'
import elevationShadowStyle from '../Utils/ShadowStyle'

const { width, height } = Dimensions.get('window')

const viewStyles = StyleSheet.create({
  container: {
    flex: 1
  },

  section: {
    padding: metrics.s20
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  rowSpread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  justifyCenter: {
    justifyContent: 'center'
  },

  mainContainer: {
    flex: 1,
    flexGrow: 1
  },

  mainPanelHeaderBg: {
    height: 120
  },

  mainPanelHeaderFg: {
    justifyContent: 'center'
  },

  mainPanel: {
    backgroundColor: COLORS.grey100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    ...elevationShadowStyle({ elevation: 6 })
  },

  pickerTextStyle: {
    ...human.caption1
  },

  noDataRefreshButton: {
    paddingVertical: 5,
    width: 100
  },

  fullScreenCalendar: {
    backgroundColor: COLORS.grey100
  },

  floatingBottomActionBar: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default viewStyles
