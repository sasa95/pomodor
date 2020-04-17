import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'
import { Timer } from '../scenes/Timer/Timer'
import { Stats } from '../scenes/Stats/Stats'
import { Settings } from '../scenes/Settings/Settings'
import { ScrollToTop } from '../ScrollToTop'

const BackLayer = styled.div`
  height: 100vh;
  background: ${({ theme, dark }) =>
    dark ? theme.palette.primary.dark : theme.palette.primary.main};
`

const FrontLayer = styled.main`
  position: relative;
  top: 127px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: calc(100% - 127px);
  background: ${({ theme }) => theme.palette.background.default};
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    position: absolute;
    top: 64px;
    right: 0;
    z-index: 1100;
    border-top-left-radius: 33px;
    border-top-right-radius: 0;
    width: calc(100% - 92px);
    min-height: calc(100vh - 64px);
  }
`

export const MainContainer = () => {
  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const mainRef = useRef()

  return (
    <BackLayer theme={theme} dark={darkMode || darkModeCached}>
      <FrontLayer theme={theme} ref={mainRef}>
        <ScrollToTop container={mainRef} />
        <Container>
          <Box pb={2}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/timer" />
              </Route>
              <Route path="/timer" component={Timer} />
              <Route path="/stats" component={Stats} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </Box>
        </Container>
      </FrontLayer>
    </BackLayer>
  )
}
