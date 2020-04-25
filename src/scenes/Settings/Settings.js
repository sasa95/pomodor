import React from 'react'
import styled, { css } from 'styled-components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Sliders } from './components/Sliders'
import { Switches } from './components/Switches'
import { DaySelect } from './components/DaySelect'

export const Settings = () => {
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')

  return (
    <Container sidenav={sidenav}>
      <Sliders />
      <DaySelect />
      <Switches />
    </Container>
  )
}

const Container = styled.div`
  width: 300px;
  margin: auto;
  padding-top: 24px;
  padding-left: 29px;
  padding-right: 32px;

  ${({ sidenav }) =>
    sidenav &&
    css`
      width: 400px;
    `}
`
