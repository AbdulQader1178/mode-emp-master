import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')
const innerMargin = 2

const Tabs = ({
  tabOneLabel = 'Tab One',
  tabTwoLabel = 'Tab Two',
  renderTabOneContent,
  renderTabTwoContent,
  containerWidth,
  containerHeight = 42,
  containerBorderWidth = 1,
  labelStyle,
  containerStyle,
  outerContainerStyle,
  // color = '#007aff'
  color = '#000'
}) => {
  const [active, setActive] = useState(0)
  const [xTabOne, setXTabOne] = useState(0)
  const [xTabTwo, setXTabTwo] = useState(0)
  const [translateX, setTranslateX] = useState(new Animated.Value(0))
  const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0))
  const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width))
  const [translateY, setTranslateY] = useState(-1000)

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100
    }).start()
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100
        }).start()
      ])
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100
        }).start()
      ])
    }
  }

  useEffect(() => {
    if (active === 0) {
      handleSlide(xTabOne)
    }
    if (active === 1) {
      handleSlide(xTabTwo)
    }
  }, [active])

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...outerContainerStyle
        }}
      >
        <View
          style={{
            borderRadius: containerHeight / 2,
            borderColor: color,
            borderWidth: containerBorderWidth,
            flexDirection: 'row',
            height: containerHeight + containerBorderWidth * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            width: containerWidth || width,
            ...containerStyle
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: (containerWidth || width) / 2 - innerMargin * 2,
              height: containerHeight - innerMargin * 2,
              top: innerMargin,
              left: innerMargin - containerBorderWidth,
              backgroundColor: color,
              borderRadius: (containerHeight - innerMargin * 2) / 2,
              transform: [
                {
                  translateX
                }
              ]
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: containerHeight / 2
            }}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
            onPress={() => setActive(0)}
          >
            <Text style={{
              color: active === 0 ? '#fff' : color,
              fontWeight: active === 0 ? 'bold' : 'normal',
              ...labelStyle
            }}
            >
              {tabOneLabel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: containerHeight / 2
            }}
            onLayout={event => setXTabTwo(event.nativeEvent.layout.x)}
            onPress={() => setActive(1)}
          >
            <Text style={{
              color: active === 1 ? '#fff' : color,
              fontWeight: active === 1 ? 'bold' : 'normal',
              ...labelStyle
            }}
            >
              {tabTwoLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateX: translateXTabOne
                }
              ]
            }}
            onLayout={event => setTranslateY(event.nativeEvent.layout.height)}
          >
            {renderTabOneContent && renderTabOneContent()}
          </Animated.View>

          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateX: translateXTabTwo
                },
                {
                  translateY: -translateY
                }
              ]
            }}
          >
            {renderTabTwoContent && renderTabTwoContent()}
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Tabs
