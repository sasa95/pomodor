import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import MatAppBar from '@material-ui/core/AppBar'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'

export const AppBar = () => {
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const theme = useTheme()

  return (
    <Backdrop sidenav={sidenav} theme={theme} dark={darkMode || darkModeCached}>
      <meta name="theme-color" content={darkMode || darkModeCached ? theme.palette.primary.dark : theme.palette.primary.main} />
      <Toolbar />
      <NavList />
    </Backdrop>
  )
}

const Backdrop = styled(MatAppBar)`
  box-shadow: none;
  background: ${({ theme, dark }) =>
    dark ? theme.palette.primary.dark : theme.palette.primary.main};

  ${({ sidenav }) =>
    sidenav &&
    css`
      height: 100%;
    `}
`
