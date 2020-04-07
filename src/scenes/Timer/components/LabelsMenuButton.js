import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { Label } from './Labels/Label'
import { setFullscreenDialog, setDesktopDialog } from '../data/labels/actions'

const LabelMenuItem = styled(MenuItem)`
  .MuiIconButton-root {
    visibility: ${({ touchscreen }) => (touchscreen ? 'unset' : 'hidden')};
  }

  &:hover .MuiIconButton-root {
    visibility: ${({ touchscreen }) => (touchscreen ? 'unset' : 'visible')};
  }
`

const AddLabelIcon = styled(AddIcon)`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`

export const LabelsMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [labelSelected, setLabelSelected] = useState(null)
  const { timeLeft } = useSelector((state) => state.timer)
  const { data } = useSelector((state) => state.labels)
  const dispatch = useDispatch()

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e, label) => {
    setAnchorEl(null)

    if (label && label.id && label.name && label.color) {
      setLabelSelected(label)
    }
  }

  const handleAdd = () => {
    setAnchorEl(null)

    if (isMediumScreen) {
      dispatch(setDesktopDialog(true))
    } else {
      dispatch(setFullscreenDialog(true))
    }
  }
  return (
    <>
      <IconButton
        disabled={!timeLeft}
        aria-label="Select a label"
        onClick={handleClick}
      >
        <ListIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
        margin="dense"
      >
        {data.map((label) => (
          <LabelMenuItem
            key={label.id}
            onClick={(e) => handleClose(e, label)}
            px={0}
            touchscreen={'ontouchstart' in document.documentElement ? 1 : 0}
          >
            <Label label={label} />
          </LabelMenuItem>
        ))}
        <MenuItem onClick={handleAdd}>
          <AddLabelIcon />
          Add new label
        </MenuItem>
      </Menu>
    </>
  )
}
