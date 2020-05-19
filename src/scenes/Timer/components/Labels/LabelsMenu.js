import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { Label } from './Label'
import {
  setFullscreenDialog,
  setDesktopDialog,
  setMenuOpened,
  setLabelSelected,
} from '../../../../data/labels/actions'

export const LabelsMenu = ({ anchor }) => {
  const [anchorEl, setAnchorEl] = useState(anchor || null)

  const { data, labelSelected, menuOpened } = useSelector(
    (state) => state.labels
  )
  const dispatch = useDispatch()

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (anchor) {
      setAnchorEl(anchor)
    }
  }, [anchor])

  const handleClose = (label) => {
    dispatch(setMenuOpened(false))

    if (label && label.id && label.name && label.color) {
      dispatch(setLabelSelected(label))
    }
  }

  const handleAdd = (e) => {
    e.stopPropagation()

    if (isMediumScreen) {
      dispatch(setDesktopDialog(true))
    } else {
      dispatch(setFullscreenDialog(true))
    }
  }

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={menuOpened}
      onClose={handleClose}
      margin="dense"
    >
      {data.map((label) => (
        <LabelMenuItem
          key={label.id}
          selected={labelSelected && label.id === labelSelected.id}
          onClick={() => handleClose(label)}
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
  )
}

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

export { LabelMenuItem }
