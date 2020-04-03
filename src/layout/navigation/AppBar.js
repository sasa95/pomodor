import React from 'react'
import MatAppBar from '@material-ui/core/AppBar'
import { useTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'
import { useSelector } from 'react-redux'

const Backdrop = styled(MatAppBar)`
  box-shadow: none;
  background: ${({ theme, dark }) =>
    dark ? theme.palette.primary.dark : theme.palette.primary.main};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 100%;
  }
`

export const AppBar = () => {
  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  return (
    <Backdrop theme={theme} dark={darkMode || darkModeCached}>
      <Toolbar />
      <NavList />
    </Backdrop>
  )
}
