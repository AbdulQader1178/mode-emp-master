import { DefaultTheme, DarkTheme, configureFonts } from 'react-native-paper'
import { TEXT_NORMAL, TEXT_SEMIBOLD } from '../Components/Text'

export const commonColors = {
  info: '#14BFF4',
  error: '#E63B2E',
  success: '#6fda44',
  warn: '#f5820b'
}

const fontConfig = {
  default: {
    regular: {
      fontFamily: TEXT_NORMAL.fontFamily,
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: TEXT_SEMIBOLD.fontFamily,
      fontWeight: 'normal'
    },
    light: {
      fontFamily: TEXT_NORMAL.fontFamily,
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: TEXT_NORMAL.fontFamily,
      fontWeight: 'normal'
    }
  }
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...commonColors,
    primary: '#b6091c',
    accent: '#81C3D7',
    tertiary: '#278591',
    text: '#221D23',
    background: '#FFF',
    surface: '#FFF',
    border: '#221D23'
  },
  fonts: configureFonts(fontConfig)
}

export const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...commonColors,
    primary: '#b6091c',
    accent: '#81C3D7',
    tertiary: '#278591',
    text: '#FFF',
    background: '#121212',
    surface: '#1e1e1e',
    border: '#221D23',

    inputUnderLine: '#FFFFFF',
    inputBackground: '#414A5A',
    placeholder: 'white'
  },
  fonts: configureFonts(fontConfig)
}
