import React from 'react'
import { Toolbar as MatToolbar } from '@material-ui/core'
import styled from 'styled-components'

const Logotype = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-weight: 900;
`

const Toolbar = () => (
  <MatToolbar>
    <Logotype>POMODOR</Logotype>
  </MatToolbar>
)

export { Toolbar }
