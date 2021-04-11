import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { CssBaseline } from '@material-ui/core'
import { firebase } from './firebase/firebase'
import { setUserInfo } from './data/auth/actions'
import { startSetSettings } from './data/settings/actions'
import { ThemeConfig } from './ThemeConfig'
import { startSetLabels } from './data/labels/actions'
import { startSetSessions } from './data/sessions/actions'
import { setProgressVisibility } from './data/progress/actions'
import { Layout } from './components/Layout/Layout'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setProgressVisibility(true))

      if (user) {
        const userInfo = { uid: user.uid }
        userInfo.creationTime = user.metadata.creationTime

        if (user.providerData && user.providerData.length) {
          userInfo.name = user.providerData[0].displayName
          userInfo.photo = user.providerData[0].photoURL
        }

        dispatch(setUserInfo(userInfo))

        await Promise.all([
          dispatch(startSetSettings()),
          dispatch(startSetLabels()),
          dispatch(startSetSessions()),
        ])

        dispatch(setProgressVisibility(false))
      } else {
        firebase.auth().signInAnonymously()
      }
    })
  }, [dispatch])

  return (
    <ThemeConfig>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }

  html, body, #root {
    height: 100%;
    overflow-y: auto;
  }

  .MuiChip-root {
    border-radius: 8px;
    width: 80px;
  }

  .MuiCard-root {
    border-radius: 8px;
  }

  .MuiCardHeader-title {
    font-weight: bold;
  }
`
