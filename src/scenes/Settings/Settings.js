import React from 'react'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import { Sliders } from './components/Sliders'
import { Switches } from './components/Switches'
import { DaySelect } from './components/DaySelect'

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

export const Settings = () => {
  const theme = useTheme()

  return (
    <Container theme={theme}>
      <Sliders />
      <DaySelect />
      <Switches />
    </Container>
  )
}
