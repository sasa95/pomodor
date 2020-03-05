import React from 'react'
import { AppBar as MatAppBar, useTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'

const Backdrop = styled(MatAppBar)`
  box-shadow: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 100%;
  }
`

const AppBar = () => {
  const theme = useTheme()

  return (
    <Backdrop theme={theme}>
      <Toolbar />
      <NavList />
    </Backdrop>
  )
}

export { AppBar }
