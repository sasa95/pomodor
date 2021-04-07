import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useMediaQuery } from '@material-ui/core'
import { SignIn } from './SignIn'
import { UserAvatar } from './UserAvatar'
import OfflineIcon from '@material-ui/icons/WifiOff'
import Button from '@material-ui/core/Button'
import { MenuIcon } from './MenuIcon'
import { Logo } from './Logo'

export const Toolbar = () => {
  const isUserPerm = useSelector((state) => state.auth.name)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const isDesktop = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const showBorder = (darkMode || darkModeCached) && !isDesktop

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
    <Container showBorder={showBorder}>
      {isOnline ? (
        isUserPerm ? (
          <UserAvatar />
        ) : (
          <SignIn />
        )
      ) : (
        <OfflineIcon data-role="offline-icon" />
      )}

      <Logo height={30} />

      <HamburgerButton aria-label="menu">
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

  ${({ showBorder }) =>
    showBorder &&
    css`
      border-bottom: 1px solid #eee;
    `}
`

const HamburgerButton = styled(Button)`
  height: 64px;
`
