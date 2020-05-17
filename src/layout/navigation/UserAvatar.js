import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MatAvatar from '@material-ui/core/Avatar'
import { startSignOut } from '../../data/auth/actions'
import { setSettings } from '../../data/settings/actions'
import { initialState } from '../../data/settings/reducer'

export const UserAvatar = () => {
  const { name, photo } = useSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(startSignOut())
    dispatch(setSettings(initialState))
    handleClose()
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')

  return (
    <>
      <Avatar sidenav={sidenav} alt={name} src={photo} onClick={openMenu} />
      <Menu
        id="user-menu"
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

export const Avatar = styled(MatAvatar)`
  width: 30px;
  height: 30px;
  cursor: pointer;

  ${({ sidenav }) =>
    sidenav &&
    css`
      width: 35px;
      height: 35px;
    `}
`
