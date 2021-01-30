import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image } from 'react-native'
import check from 'check-types'
import moment from 'moment'

import { View, Text, SummaryView, CustomerProfileMini, ModalImageViewer, TouchableRipple } from '../Components'
import useTheme from '../DesignSystem/Context'
import elevationShadowStyle from '../Utils/ShadowStyle'
import Spacings from '../DesignSystem/Spacings'

const getTimelineDataFromLogs = (logs) => {
  return logs.map(({ log, dateTime }) => {
    const date = moment(dateTime).format('x')

    return {
      date,
      data: [{ title: log, date }]
    }
  })
}

const OrderDetails = ({ data }) => {
  const { colors } = useTheme()

  const [timelineData, setTimelineData] = useState([])
  const [isImageViewerModalVisible, setIsImageViewerModalVisible] = useState(false)
  const [imageViewerIndex, setImageViewerIndex] = useState(0)

  const {
    // creationDateTime,
    // title,
    // categoryName,
    // vendorName,
    // customerName,
    endNote,
    media,
    // urn,
    log,
    // status,
    // statusText,
    logs,
    serviceSummary,
    paymentSummary
  } = data

  const onPressMediaItem = (index) => {
    setImageViewerIndex(index)
    setIsImageViewerModalVisible(true)
  }

  const renderMediaItems = () => {
    const images = media.map(uri => ({
      uri,
      freeHeight: true
    }))

    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {media.map((uri, index) => (
            <View
              style={[
                styles.item,
                index === 0 && styles.firstItem
              ]}
              key={index}
            >
              <TouchableRipple
                style={styles.thumbnailContainer}
                onPress={() => onPressMediaItem(index)}
              >
                <Image
                  source={{ uri }}
                  resizeMode='cover'
                  style={styles.thumbnail}
                />
              </TouchableRipple>
            </View>
          ))}
        </ScrollView>
        <ModalImageViewer
          visible={isImageViewerModalVisible}
          images={images}
          imageIndex={imageViewerIndex}
          onRequestClose={() => setIsImageViewerModalVisible(false)}
        />
      </>
    )
  }

  useEffect(() => {
    setTimelineData(getTimelineDataFromLogs(logs))
  }, [logs])

  return (
    <>
      <View marginB-8 padding-24 style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text subhead>{log}</Text>
        <View marginT-8>
          <CustomerProfileMini data={data} />
        </View>
      </View>

      {/* <View flex center style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text body>Rate Customer</Text>
          <Ratings imageSize={30} startingValue={0} />
        </View> */}

      <View marginV-8 padding-24 style={[styles.section, { backgroundColor: colors.surface }]}>
        <Subheading text='Logs' />
        <View>
          {check.nonEmptyArray(logs) && logs.map(({ log }, i) => (
            <View key={i} marginB-16>
              <Text subhead>{log}</Text>
            </View>
          ))}
        </View>
      </View>

      <View marginV-8 padding-24 style={[styles.section, { backgroundColor: colors.surface }]}>
        <Subheading text='Order Summary' />
        <SummaryView data={serviceSummary} />
      </View>

      <View marginV-8 paddingT-24 style={[styles.section, { backgroundColor: colors.surface }]}>
        <View paddingH-24>
          <Subheading text='Instructions from Customer' />
          <Text subhead>{endNote}</Text>
        </View>
        <View paddingV-24>
          {renderMediaItems()}
        </View>
      </View>

      <View marginV-8 padding-24 style={[styles.section, { backgroundColor: colors.surface }]}>
        <Subheading text='Payment Summary' />
        <SummaryView data={paymentSummary} showBullets={false} horizontal />
      </View>
      <View paddingV-50 />
    </>
  )
}

const Subheading = ({ text }) => {
  return (
    <View left marginB-24>
      <View marginB-4 paddingR-16 paddingV-4>
        <Text body>{text}</Text>
      </View>
      <View bg-grey20 height={2} width={30} />
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    // borderRadius: 12,
    ...elevationShadowStyle({ elevation: 3 })
  },
  item: {
    alignItems: 'center',
    borderRadius: 4,
    ...elevationShadowStyle({ elevation: 2 }),
    height: 80,
    justifyContent: 'center',
    margin: Spacings.gridGutter / 4,
    overflow: 'hidden',
    width: 80
  },
  firstItem: {
    marginLeft: Spacings.gridGutter * 1.5
  },
  thumbnailContainer: {
    flex: 1,
    position: 'relative'
  },
  thumbnail: {
    height: 80,
    width: 80
  }
})

export default OrderDetails
