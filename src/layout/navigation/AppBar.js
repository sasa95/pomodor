import React from 'react'
import MatAppBar from '@material-ui/core/AppBar'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import styled, { css } from 'styled-components'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'
import { useSelector } from 'react-redux'

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

export const AppBar = () => {
  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')

  return (
    <Backdrop sidenav={sidenav} theme={theme} dark={darkMode || darkModeCached}>
      <Toolbar />
      <NavList />
    </Backdrop>
  )
}
