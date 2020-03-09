import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './theme'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'
import { firebase } from './firebase/firebase'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // eslint-disable-next-line no-console
      console.dir(user)
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
