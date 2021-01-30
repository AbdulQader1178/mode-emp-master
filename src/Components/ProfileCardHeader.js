import React from 'react'
import {
  Dimensions,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'

const ProfileCard = (props) => {
  const renderContactHeader = () => {
    const { avatar, avatarBackground, name, bio, editable } = props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: avatarBackground
            }}
            style={styles.coverImage}
          >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{name}</Text>
              <Text style={styles.coverBio}>{bio}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: avatar
            }}
            style={styles.profileImage}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.cardContainer}>
        {renderContactHeader()}
      </View>
    </View>
  )
}

ProfileCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  avatarBackground: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tabContainerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
}

ProfileCard.defaultProps = {
  editable: false,
  containerStyle: {},
  tabContainerStyle: {}
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  coverBio: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600'
  },
  coverContainer: {
    marginBottom: 55,
    position: 'relative'
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width
  },
  coverMetaContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135
  },
  coverName: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  indicatorTab: {
    backgroundColor: 'transparent'
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: 'absolute'
  },
  sceneContainer: {
    marginTop: 10
  },
  scroll: {
    backgroundColor: 'white'
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6
  },
  userImage: {
    marginRight: 12
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC'
  }
})

export default ProfileCard
