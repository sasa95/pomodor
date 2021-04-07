import React, { useState } from 'react'
import MatDrawer from '@material-ui/core/Drawer'
import { useMediaQuery } from '@material-ui/core'
import styled from 'styled-components'
import { NavList } from './NavList'

export const NavDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const isDesktop = +useMediaQuery('(min-width:900px) and (min-height:500px)')

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setDrawerOpened(open)
  }

  return (
    <DrawerContainer>
      <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        anchor="left"
        open={true}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent>
          <NavList />
        </DrawerContent>
      </Drawer>
    </DrawerContainer>
  )
}

const DrawerContent = styled.div`
  height: 100%;
`
const Drawer = styled(MatDrawer)`
  /* width: 254px; */
`
const DrawerContainer = styled.div`
  width: 254px;
`
