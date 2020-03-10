import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FaceIcon from '@material-ui/icons/Face'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SvgIcon from '@material-ui/core/SvgIcon'
import { useTheme } from '@material-ui/core'
import styled from 'styled-components'
import { GoogleIcon } from './GoogleIcon'
import { linkAccount } from '../../data/auth/actions'
import { googleAuthProvider } from '../../firebase/firebase'

const TriggerButton = styled(Button)`
  color: ${({ theme }) => theme.palette.secondary.light};
`

const SignIn = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const theme = useTheme()

  const openMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const googleAuth = async () => {
    dispatch(linkAccount(googleAuthProvider))
    handleClose()
  }

  return (
    <>
      <TriggerButton
        theme={theme}
        aria-controls="sign-in-menu"
        aria-haspopup="true"
        onClick={openMenu}
        startIcon={<FaceIcon />}
      >
        Sign In
      </TriggerButton>
      <Menu
        id="sign-in-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={googleAuth}>
          <ListItemIcon>
            <SvgIcon>
              <GoogleIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Sign in via Google" />
        </MenuItem>
      </Menu>
    </>
  )
}

export { SignIn }
