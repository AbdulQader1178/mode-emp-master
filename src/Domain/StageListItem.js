import React from 'react'
import { StyleSheet } from 'react-native'
import moment from 'moment'
import check from 'check-types'

import { View, Text, Icon, TouchableRipple } from '../Components'

import COLORS from '../Constants/Colors'
import Spacings from '../DesignSystem/Spacings'

const DATE_TIME_DISPLAY_FORMAT = 'DD MMM YYYY, HH:mm'

const StageListItem = ({
  data,
  index,
  isCompleted,
  isCurrent,
  isLastItem,
  horizontal = true
}) => {
  const { name, shortName, creationDateTime, modifiedDateTime } = data

  const renderDateTime = () =>
    check.nonEmptyString(creationDateTime) ? (
      <Text caption2 numberOfLines={1}>
        {`${moment(creationDateTime).format(DATE_TIME_DISPLAY_FORMAT)}`}
      </Text>
    ) : (
      <Text caption2>Not Started</Text>
    )

  const Media = () => {
    return (
      <View
        center
        style={[
          styles.media,
          isCompleted && styles.completedItem,
          isCurrent && styles.currentItem,
          isCurrent && styles.currentMediaItem,
          index === 0 && horizontal && styles.firstItem,
          isLastItem && styles.lastItem
        ]}
      >
        <View center>
          {isCompleted && (
            <Icon
              type='AntDesign'
              name='checkcircle'
              size={30}
              color={COLORS.stageCompleted}
            />
          )}
          {isCurrent && (
            <Icon
              type='AntDesign'
              name='clockcircle'
              size={30}
              color={COLORS.stageInProgress}
            />
          )}
          {!isCompleted && !isCurrent && (
            <Icon
              type='AntDesign'
              name='rightcircle'
              size={30}
              color={COLORS.stageNeitherCompletedNorInProgress}
            />
          )}
        </View>
        {horizontal && (
          <Text caption2 numberOfLines={1}>
            {shortName}
          </Text>
        )}
      </View>
    )
  }

  if (!horizontal) {
    return (
      <TouchableRipple>
        <View row centerV>
          <View centerH>
            <Media />
          </View>
          <View
            style={[
              styles.content,
              isCompleted && styles.completedItem,
              isCurrent && styles.currentItem
            ]}
          >
            <View marginB-4>
              <Text body numberOfLines={1}>
                {name}
              </Text>
            </View>
            <View row centerV>
              {renderDateTime(creationDateTime)}
              {isCompleted && (
                <>
                  <Text caption1> - </Text>
                  {renderDateTime(modifiedDateTime)}
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableRipple>
    )
  }

  return <Media />
}

const styles = StyleSheet.create({
  media: {
    height: 60,
    marginHorizontal: Spacings.gridGutter / 2,
    marginVertical: Spacings.gridGutter,
    opacity: 0.6,
    width: 60
  },
  currentMediaItem: {
    height: 60,
    width: 60
  },
  image: {
    height: 24,
    marginBottom: 4,
    width: 24
  },
  content: {
    flex: 1,
    opacity: 0.6,
    paddingHorizontal: Spacings.gridGutter
  },
  completedItem: {
    opacity: 1
  },
  currentItem: {
    opacity: 1
  },
  firstItem: {
    marginLeft: Spacings.gridGutter
  },
  lastItem: {
    marginRight: Spacings.gridGutter
  },
  indicatorIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    position: 'absolute',
    top: -10,
    right: -10
  }
})

export default StageListItem
