import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FaceIcon from '@material-ui/icons/Face'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SvgIcon from '@material-ui/core/SvgIcon'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import { GoogleIcon } from './GoogleIcon'

const TriggerButton = styled(Button)`
  color: ${({ theme }) => theme.palette.secondary.light};
`

const SignIn = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <TriggerButton
        theme={theme}
        aria-controls="sign-in-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem onClick={handleClose}>
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
