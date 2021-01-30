// https://stenbeck.io/styling-shadows-in-react-native-ios-and-android/

export default function elevationShadowStyle ({ elevation, shadowColor, shadowOpacity, shadowRadius, backgroundColor }) {
  return {
    backgroundColor: backgroundColor || 'white',
    elevation,
    shadowColor: shadowColor || 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: shadowOpacity || 0.3,
    shadowRadius: shadowRadius ? shadowRadius * elevation : 0.8 * elevation
  }
}
