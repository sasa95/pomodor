import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {
  setLabelEditting,
  setFormValue,
  setFullscreenDialog,
  setDeleteAlert,
  startDeleteLabel,
} from '../../../../data/labels/actions'

export const DeleteAlert = () => {
  const { deleteAlert, labelEditting } = useSelector((state) => state.labels)

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(startDeleteLabel(labelEditting.id))

    dispatch(setDeleteAlert(false))
    dispatch(setFullscreenDialog(false))
    dispatch(setLabelEditting(null))
    dispatch(setFormValue(null))
  }

  const closeAlert = () => {
    dispatch(setDeleteAlert(false))
  }

  return (
    <Dialog
      open={deleteAlert}
      onClose={closeAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      id="delete-alert"
    >
      <DialogTitle id="alert-dialog-title">
        Delete
        <LabelName color={labelEditting && labelEditting.color}>
          {' '}
          {labelEditting && labelEditting.name}
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
        <Button onClick={closeAlert}>Cancel</Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const LabelName = styled.span`
  color: ${({ color }) => color};
`
