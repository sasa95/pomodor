import React from 'react'
import { AppBar as MatAppBar } from '@material-ui/core'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'

const AppBar = () => (
  <MatAppBar>
    <Toolbar />
    <NavList />
  </MatAppBar>
)

export { AppBar }
