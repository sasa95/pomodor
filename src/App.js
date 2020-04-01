import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { CssBaseline } from '@material-ui/core'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'
import { firebase } from './firebase/firebase'
import { setUserInfo } from './data/auth/actions'
import { startSetSettings } from './data/settings/actions'
import { ThemeConfig } from './ThemeConfig'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
  const dispatch = useDispatch()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userInfo = { uid: user.uid }

      if (user.providerData && user.providerData.length) {
        userInfo.name = user.providerData[0].displayName
        userInfo.photo = user.providerData[0].photoURL
      }

      dispatch(setUserInfo(userInfo))
      dispatch(startSetSettings())
    } else {
      firebase.auth().signInAnonymously()
    }
  })

  return (
    <ThemeConfig>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <AppBar />
        <ThemeConfig />
        <MainContainer />
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App
