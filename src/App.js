import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { AppBar } from './layout/navigation/AppBar'
import { MainContainer } from './layout/MainContainer'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppBar />
      <MainContainer />
    </>
  )
}

export default App
