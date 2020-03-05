import React from 'react'
import { AppBar as MatAppBar, useTheme } from '@material-ui/core'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'
import styled from 'styled-components'

const Backdrop = styled(MatAppBar)`
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
