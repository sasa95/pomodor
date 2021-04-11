import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import { NavList } from './components/NavList'
import { setDrawerOpened } from '../../../../data/drawer/actions'
import { Logo } from '../../../Logo'

export const NavDrawer = () => {
  const isDrawerOpened = useSelector((state) => state.drawer)
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width:900px) and (min-height:500px)')

  const closeDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    dispatch(setDrawerOpened(false))
  }

  useEffect(() => {
    if (isDesktop && !isDrawerOpened) {
      dispatch(setDrawerOpened(true))
    } else if (!isDesktop && isDrawerOpened) {
      dispatch(setDrawerOpened(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  return (
    <DrawerContainer>
      <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        anchor={isDesktop ? 'left' : 'right'}
        open={isDrawerOpened}
        onClose={closeDrawer()}
        width="254px"
      >
        <DrawerContent bgcolor="background.default">
          {isDesktop ? (
            <LogoContainer>
              <NavLink to="/timer">
                <Logo width={120} height={43} />
              </NavLink>
            </LogoContainer>
          ) : (
            <CloseButton aria-label="close drawer" onClick={closeDrawer()}>
              <CloseIcon />
            </CloseButton>
          )}

          <NavList />
        </DrawerContent>
      </Drawer>
    </DrawerContainer>
  )
}

const DrawerContainer = styled.div`
  width: 254px;

  & .MuiDrawer-root {
    width: 254px;
  }
`

const DrawerContent = styled(Box)`
  height: 100%;
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1;
`

const LogoContainer = styled(Box)`
  position: absolute;
  top: 80px;
  left: 60px;
  z-index: 1;
`
