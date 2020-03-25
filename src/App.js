import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './theme'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'
import { firebase } from './firebase/firebase'
import { setUserInfo } from './data/auth/actions'

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
    } else {
      firebase.auth().signInAnonymously()
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <AppBar />
        <MainContainer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
