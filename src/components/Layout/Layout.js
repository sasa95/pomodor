import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { AppBar } from './components/AppBar/AppBar'
import { NavDrawer } from './components/NavDrawer/NavDrawer'
import { MainContainer } from './components/MainContainer/MainContainer'

export const Layout = () => {
  const isDesktop = useMediaQuery('(min-width:900px) and (min-height:500px)')

  return (
    <>
      {!isDesktop && <AppBar />}
      <Box display={isDesktop ? 'flex' : 'block'}>
        <NavDrawer />
        <MainContainer />
      </Box>
    </>
  )
}
