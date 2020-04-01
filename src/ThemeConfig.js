import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'

import useMounted from './helpers/useMounted'

const ThemeConfig = ({ children }) => {
  const getTheme = (dark) => {
    return createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light',
        primary: {
          main: indigo[500],
        },
        secondary: {
          main: pink[300],
        },
        background: {
          default: dark ? '#212121' : '#fafafa',
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

    setThemeSelected(getTheme(darkMode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  return (
    <ThemeProvider theme={themeSelected}>{children || <></>}</ThemeProvider>
  )
}

export { ThemeConfig }
