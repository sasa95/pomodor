import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import OfflineIcon from '@material-ui/icons/WifiOff'
import MatLinearProgress from '@material-ui/core/LinearProgress'
import { Timer } from '../../../../scenes/Timer/Timer'
import { Stats } from '../../../../scenes/Stats/Stats'
import { Settings } from '../../../../scenes/Settings/Settings'
import { ScrollToTop } from './components/ScrollToTop'
import { Page404 } from './components/Page404'
import { Footer } from './components/Footer'
import { SignIn } from '../../../SignIn/SignIn'
import { UserAvatar } from '../../../UserAvatar'

export const MainContainer = () => {
  const isUserPerm = useSelector((state) => state.auth.name)
  const progress = useSelector((state) => state.progress)
  const sidenav = +useMediaQuery('(min-width:900px) and (min-height:600px)')
  const mainRef = useRef()
  const theme = useTheme()
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
    <Box
      sidenav={sidenav}
      theme={theme}
      ref={mainRef}
      width="100%"
      display="flex"
      flexDirection="column"
      height="100vh"
    >
      {progress && <LinearProgress color="secondary" />}
      <ScrollToTop container={mainRef} />
      <Wrapper pb={2} flex={1}>
        {!!sidenav && (
          <Box display="flex" justifyContent="flex-end" pr="55px">
            {isOnline ? (
              isUserPerm ? (
                <UserAvatar />
              ) : (
                <SignIn />
              )
            ) : (
              <OfflineIcon data-role="offline-icon" />
            )}
          </Box>
        )}

        <Switch>
          <Route exact path="/">
            <Redirect to="/timer" />
          </Route>
          <Route path="/timer" component={Timer} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
          <Route component={Page404} />
        </Switch>
      </Wrapper>
      <Footer />
    </Box>
  )
}

const LinearProgress = styled(MatLinearProgress)`
  position: absolute;
  top: 0;
  width: 100%;
`

const Wrapper = styled(Box)`
  padding: 95px 0 16px 0;

  @media (min-width: 900px) {
    padding-top: 66px;
  }
`
