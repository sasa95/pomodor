import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MatToolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import { SignIn } from './SignIn'
import { UserAvatar } from './UserAvatar'
import OflineIcon from '@material-ui/icons/WifiOff'

export const Toolbar = () => {
  const isUserPerm = useSelector((state) => state.auth.name)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

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
    <MatToolbar>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logotype>POMODOR</Logotype>

        {isOnline ? isUserPerm ? <UserAvatar /> : <SignIn /> : <OflineIcon />}
      </Box>
    </MatToolbar>
  )
}

const Logotype = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-weight: 900;
`
