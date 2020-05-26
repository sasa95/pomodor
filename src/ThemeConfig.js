import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'

export const ThemeConfig = ({ children }) => {
  const darkModeCached = +localStorage.getItem('darkMode')
  const [darkTheme, setDarkTheme] = useState(darkModeCached)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const progress = useSelector((state) => state.progress)

  const userTheme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: indigo[500],
        light: indigo[200],
        dark: '#272727',
      },
      secondary: {
        main: pink[300],
      },
      background: {
        default: darkTheme ? '#121212' : '#fafafa',
      },
      text: {
        primary: darkTheme ? '#DDE0F4' : '#424242',
        secondary: darkTheme ? '#fff9' : '#575757',
      },
    },
  })

  useEffect(() => {
    if (!progress) {
      localStorage.setItem('darkMode', darkMode)
      setDarkTheme(darkMode)
    }
  }, [darkMode, progress])

  return <ThemeProvider theme={userTheme}>{children || <></>}</ThemeProvider>
}
