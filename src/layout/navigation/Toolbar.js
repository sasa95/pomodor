import React from 'react'
import MatToolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import { SignIn } from './SignIn'

const Logotype = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-weight: 900;
`

const Toolbar = () => (
  <MatToolbar>
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logotype>POMODOR</Logotype>
      <SignIn />
    </Box>
  </MatToolbar>
)

export { Toolbar }
