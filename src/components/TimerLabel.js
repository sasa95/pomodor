import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import grey from '@material-ui/core/colors/grey'
import { useDispatch } from 'react-redux'
import { setDialogOpened, setLabelToEdit } from '../data/labels/actions'

const ColorIndicator = styled.span`
  background: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`

const EditButton = styled(IconButton)`
  color: ${grey[400]};
`

export const TimerLabel = ({ label }) => {
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(setDialogOpened(true))
    dispatch(setLabelToEdit(label))
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
      <EditButton aria-label="Edit label" onClick={handleEdit}>
        <EditIcon />
      </EditButton>
    </Box>
  )
}
