import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MatAvatar from '@material-ui/core/Avatar'
import { useTheme } from '@material-ui/core'
import { startSignOut } from '../../data/auth/actions'

const Avatar = styled(MatAvatar)`
  width: 30px;
  height: 30px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 35px;
    height: 35px;
  }
`

export const UserAvatar = () => {
  const { name, photo } = useSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = () => {
    dispatch(startSignOut())
    handleClose()
  }
  const theme = useTheme()

  return (
    <>
      <Avatar alt={name} src={photo} theme={theme} onClick={openMenu} />
      <Menu
        id="sign-in-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}
