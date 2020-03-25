import React from 'react'
import { useSelector } from 'react-redux'
import MatToolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import { SignIn } from './SignIn'
import { UserAvatar } from './UserAvatar'

const Logotype = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-weight: 900;
`

const Toolbar = () => {
  const isUserPerm = useSelector((state) => state.auth.name)

  return (
    <MatToolbar>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logotype>POMODOR</Logotype>
        {isUserPerm ? <UserAvatar /> : <SignIn />}
      </Box>
    </MatToolbar>
  )
}

export { Toolbar }
