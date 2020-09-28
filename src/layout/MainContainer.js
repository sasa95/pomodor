import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import MatLinearProgress from '@material-ui/core/LinearProgress'
import { Timer } from '../scenes/Timer/Timer'
import { Stats } from '../scenes/Stats/Stats'
import { Settings } from '../scenes/Settings/Settings'
import { ScrollToTop } from './navigation/ScrollToTop'
import { Page404 } from '../Page404'
import { Footer } from './footer/Footer'

export const MainContainer = () => {
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const progress = useSelector((state) => state.progress)
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const mainRef = useRef()
  const theme = useTheme()

  return (
    <BackLayer theme={theme} dark={darkMode || darkModeCached}>
      <FrontLayer sidenav={sidenav} theme={theme} ref={mainRef}>
        {progress && <LinearProgress color="secondary" />}
        <ScrollToTop container={mainRef} />
        <Box pb={2} pt={5} flex={1}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/timer" />
            </Route>
            <Route path="/timer" component={Timer} />
            <Route path="/stats" component={Stats} />
            <Route path="/settings" component={Settings} />
            <Route component={Page404} />
          </Switch>
        </Box>
        <Footer />
      </FrontLayer>
    </BackLayer>
  )
}

// MUST subtract 1px or else ios does weird double overscroll
const BackLayer = styled.div`
  height: calc(100% + env(safe-area-inset-top) - 1px);
  overflow-y: hidden;
  background: ${({ theme, dark }) =>
    dark ? theme.palette.primary.dark : theme.palette.primary.main};
`

const FrontLayer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: calc(133px + env(safe-area-inset-top));
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: calc(100% - 133px - env(safe-area-inset-top));
  background: ${({ theme }) => theme.palette.background.default};
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  ${({ sidenav }) =>
    sidenav &&
    css`
      position: absolute;
      top: 64px;
      right: 0;
      z-index: 1100;
      border-top-left-radius: 33px;
      border-top-right-radius: 0;
      width: calc(100% - 92px);
      min-height: calc(100% - 64px);
    `}
`

const LinearProgress = styled(MatLinearProgress)`
  position: absolute;
  top: 0;
  width: 100%;
`
