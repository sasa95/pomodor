import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import MatLinearProgress from '@material-ui/core/LinearProgress'
import { Timer } from '../../../../scenes/Timer/Timer'
import { Stats } from '../../../../scenes/Stats/Stats'
import { Settings } from '../../../../scenes/Settings/Settings'
import { ScrollToTop } from './components/ScrollToTop'
import { Page404 } from './components/Page404'
import { Footer } from './components/Footer'

export const MainContainer = () => {
  const progress = useSelector((state) => state.progress)
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')
  const mainRef = useRef()
  const theme = useTheme()

  return (
    <Box sidenav={sidenav} theme={theme} ref={mainRef} width="100%">
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
    </Box>
  )
}

const LinearProgress = styled(MatLinearProgress)`
  position: absolute;
  top: 0;
  width: 100%;
`
