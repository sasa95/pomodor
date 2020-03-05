import React from 'react'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'

const Main = styled.main`
  ${({ theme }) => theme.breakpoints.up('sm')} {
    min-height: calc(100vh - 60px);
    background: #fff;
    position: absolute;
    z-index: 10000;
    right: 0;
    width: calc(100% - 92px);
    transform: translateY(60px);
    border-top-left-radius: 33px;
    padding-top: 20px;
  }
`

const MainContainer = () => {
  const theme = useTheme()

  return <Main theme={theme}>Main</Main>
}

export { MainContainer }
