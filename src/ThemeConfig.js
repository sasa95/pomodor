import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'
import useMounted from './helpers/useMounted'

export const ThemeConfig = ({ children }) => {
  const getTheme = (dark) => {
    return createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light',
        primary: {
          main: indigo[500],
          light: indigo[200],
          dark: '#272727',
        },
        secondary: {
          main: pink[300],
        },
        background: {
          default: dark ? '#121212' : '#fafafa',
        },
        text: {
          primary: dark ? '#DDE0F4' : '#424242',
        },
      },
    })
  }

  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const [themeSelected, setThemeSelected] = useState(getTheme(darkModeCached))
  const darkMode = useSelector((state) => +state.settings.darkMode)

  const isMounted = useMounted()

  useEffect(() => {
    if (!isMounted) return

    setThemeSelected(getTheme(darkModeCached))
  }, [darkMode, darkModeCached, isMounted])

  return (
    <ThemeProvider theme={themeSelected}>{children || <></>}</ThemeProvider>
  )
}
