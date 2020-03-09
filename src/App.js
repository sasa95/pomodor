import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './theme'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
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
