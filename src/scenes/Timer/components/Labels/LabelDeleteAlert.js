import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {
  setLabelToEdit,
  setFormValue,
  setDialogOpened,
  setDeleteAlert,
} from '../../data/labels/actions'
import styled from 'styled-components'

const LabelName = styled.span`
  color: ${({ color }) => color};
`

export const LabelDeleteAlert = () => {
  const { opened, labelToDelete } = useSelector(
    (state) => state.labels.deleteAlert
  )

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(setDeleteAlert({ opened: false, labelToDelete: null }))
    dispatch(setDialogOpened(false))
    dispatch(setLabelToEdit(null))
    dispatch(setFormValue(null))
  }

  const closeAlert = () => {
    dispatch(setDeleteAlert({ opened: false, labelToDelete: null }))
  }

  return (
    <Dialog
      open={opened}
      onClose={closeAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete
        <LabelName color={labelToDelete && labelToDelete.color}>
          {' '}
          {labelToDelete && labelToDelete.name}
        </LabelName>{' '}
        label?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will also delete all the data and statistics related to
          this label.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAlert} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
