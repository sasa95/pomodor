import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { setFormDialog } from '../../data/labels/actions'
import { LabelForm } from './LabelForm'

export const LabelFormDialog = () => {
  const { formDialogOpened, labelToEdit, formValue } = useSelector(
    (state) => state.labels
  )

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setFormDialog(false))
  }

  return (
    <div>
      <Dialog
        open={formDialogOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Label</DialogTitle>
        <DialogContent>
          <LabelForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!formValue || !formValue.name || !formValue.color}
            onClick={handleClose}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
