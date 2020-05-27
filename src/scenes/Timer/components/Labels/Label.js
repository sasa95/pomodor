import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as materialColors from '@material-ui/core/colors'
import {
  setFullscreenDialog,
  setLabelEditting,
  setFormValue,
  setDeleteAlert,
  setDesktopDialog,
} from '../../../../data/labels/actions.js'

export const Label = ({ label }) => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.stopPropagation()

    dispatch(setLabelEditting(label))
    dispatch(setFormValue({ name: label.name, color: label.color }))

    if (isMediumScreen) {
      dispatch(setDesktopDialog(true))
    } else {
      dispatch(setFullscreenDialog(true))
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()

    dispatch(setLabelEditting(label))
    dispatch(setDeleteAlert(true))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <ColorIndicator
          color={
            theme.palette.type === 'dark'
              ? materialColors[label.color][200]
              : materialColors[label.color][500]
          }
        ></ColorIndicator>
        <span>{label.name}</span>
      </Box>

      <Box display="flex">
        <ActionButton aria-label="Edit label" onClick={handleEdit} size="small">
          <EditIcon />
        </ActionButton>

        <ActionButton
          hide={!isMediumScreen ? 1 : 0}
          aria-label="Delete label"
          onClick={handleDelete}
          size="small"
        >
          <DeleteIcon />
        </ActionButton>
      </Box>
    </Box>
  )
}

export const ColorIndicator = styled.span`
  background: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`

export const ActionButton = styled(IconButton)`
  color: ${materialColors.grey[400]};
  display: ${({ hide }) => (hide ? 'none' : 'inherit')};
`
