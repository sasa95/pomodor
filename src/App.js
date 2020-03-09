import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './theme'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'
import { firebase } from './firebase/firebase'
import configureStore from './store'
import { Provider } from 'react-redux'

const store = configureStore()

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
    } else {
      firebase.auth().signInAnonymously()
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <AppBar />
          <MainContainer />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
