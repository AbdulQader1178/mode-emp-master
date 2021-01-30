import React, { useState, useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import { lightTheme, darkTheme } from '../Theme'

const ThemeContext = React.createContext()

export const ThemeProvider = ({ dark = true, children }) => {
  const [_dark, setDark] = useState(true)
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    if (dark) {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }
  }, [dark])

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        dark: _dark,
        setDark: (isDark) => setDark(isDark)
      }}
    >
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
