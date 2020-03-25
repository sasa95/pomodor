import React from 'react'
import { Sliders } from './components/Sliders'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'

const Container = styled.div`
  width: 300px;
  margin: auto;
  padding-top: 24px;
  padding-left: 29px;
  padding-right: 32px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 400px;
  }
`

const Settings = () => {
  const theme = useTheme()

  return (
    <Container theme={theme}>
      <Sliders />
    </Container>
  )
}

export { Settings }
