import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import MatAppBar from '@material-ui/core/AppBar'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Toolbar } from './Toolbar'
import { NavList } from './NavList'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'

export const AppBar = () => {
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  // const isDesktop = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const theme = useTheme()
  // const [drawerOpened, setDrawerOpened] = useState(false)

  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === 'keydown' &&
  //     (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return
  //   }

  //   setDrawerOpened(open)
  // }

  return (
    // <Backdrop
    //   sidenav={sidenav}
    //   theme={theme}
    //   dark={darkMode || darkModeCached}
    //   id="backdrop"
    // >
    //   <meta
    //     name="theme-color"
    //     content={
    //       darkMode || darkModeCached
    //         ? theme.palette.primary.dark
    //         : theme.palette.primary.main
    //     }
    //   />
    //   <Toolbar id="toolbar" />
    //   <NavList id="navlist" />
    // </Backdrop>

    <div>
      {/* <Button onClick={toggleDrawer(true)}>Trigger</Button> */}

      <Toolbar />

      {/* mobile */}

      {/* <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        anchor="right"
        open={true}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent>
          <NavList />
        </DrawerContent>
      </Drawer> */}

      {/* desktop */}

      {/* <Drawer variant="persistent" anchor="left" open={true}>
        <div>
          <p>drawer content</p>
        </div>
      </Drawer> */}
    </div>
  )
}

// const Backdrop = styled(MatAppBar)`
//   box-shadow: none;
//   background: ${({ theme, dark }) =>
//     dark ? theme.palette.primary.dark : theme.palette.primary.main};

//   ${({ sidenav }) =>
//     sidenav &&
//     css`
//       height: 100%;
//     `}
// `

// const DrawerContent = styled.div`
//   height: 100%;
// `
