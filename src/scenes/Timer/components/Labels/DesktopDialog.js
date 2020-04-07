import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { LabelForm } from './LabelForm'
import { setDesktopDialog } from '../../data/labels/actions'

export const DesktopDialog = () => {
  const { desktopDialog, formValue } = useSelector((state) => state.labels)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setDesktopDialog(false))
  }

  return (
    <div>
      <Dialog
        open={desktopDialog}
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
