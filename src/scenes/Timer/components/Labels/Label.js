import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import grey from '@material-ui/core/colors/grey'
import { useDispatch } from 'react-redux'
import {
  setDialogOpened,
  setLabelToEdit,
  setFormValue,
  setDeleteAlert,
  setFormDialog,
} from '../../data/labels/actions.js'
import { useMediaQuery, useTheme } from '@material-ui/core'

const ColorIndicator = styled.span`
  background: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`

const ActionButton = styled(IconButton)`
  color: ${grey[400]};

  display: ${({ hide }) => (hide ? 'none' : 'inherit')};
`

export const Label = ({ label }) => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(setLabelToEdit(label))
    dispatch(setFormValue({ name: label.name, color: label.color }))

    if (isMediumScreen) {
      console.log('mali dialog')

      dispatch(setFormDialog(true))
    } else {
      console.log('full dialog')
      dispatch(setDialogOpened(true))
    }
  }

  const handleDelete = () => {
    dispatch(setDeleteAlert({ opened: true, labelToDelete: label }))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <ColorIndicator color={label.color}></ColorIndicator>
        <span>{label.name}</span>
      </Box>

      <Box display="flex">
        <ActionButton aria-label="Edit label" onClick={handleEdit}>
          <EditIcon />
        </ActionButton>

        <ActionButton
          hide={!isMediumScreen ? 1 : 0}
          aria-label="Delete label"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </ActionButton>
      </Box>
    </Box>
  )
}
