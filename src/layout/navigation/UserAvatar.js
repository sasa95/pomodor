import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MatAvatar from '@material-ui/core/Avatar'
import { useTheme } from '@material-ui/core'

const Avatar = styled(MatAvatar)`
  width: 30px;
  height: 30px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 35px;
    height: 35px;
  }
`

export const UserAvatar = () => {
  const { name, photo } = useSelector((state) => state.auth)
  const theme = useTheme()

  return <Avatar alt={name} src={photo} theme={theme} />
}
