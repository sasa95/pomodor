import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { SignIn } from '../../../SignIn/SignIn'
import { UserAvatar } from '../../../UserAvatar'
import OfflineIcon from '@material-ui/icons/WifiOff'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Button'
import { MenuIcon } from './components/MenuIcon'
import { Logo } from './../../../Logo'
import { setDrawerOpened } from '../../../../data/drawer/actions'

export const AppBar = () => {
  const isUserPerm = useSelector((state) => state.auth.name)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const isDesktop = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const showBorder = (darkMode || darkModeCached) && !isDesktop
  const theme = useTheme()

  const dispatch = useDispatch()

  const openDrawer = () => {
    dispatch(setDrawerOpened(true))
  }

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <Container showBorder={showBorder} theme={theme}>
      {isOnline ? (
        isUserPerm ? (
          <UserAvatar />
        ) : (
          <SignIn />
        )
      ) : (
        <OfflineIcon data-role="offline-icon" />
      )}

      <LogoContainer>
        <Logo height={30} />
      </LogoContainer>

      <HamburgerButton aria-label="menu" onClick={openDrawer}>
        <MenuIcon />
      </HamburgerButton>
    </Container>
  )
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 71px;
  padding: 16px 0 16px 16px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.palette.background.default};
  ${({ showBorder }) =>
    !!showBorder &&
    css`
      border-bottom: 1px solid #eee;
    `};
`

const HamburgerButton = styled(Button)`
  height: 64px;
`

const LogoContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
