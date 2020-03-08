import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'
import { BrowserRouter } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppBar />
      <MainContainer />
    </BrowserRouter>
  )
}

export default App
