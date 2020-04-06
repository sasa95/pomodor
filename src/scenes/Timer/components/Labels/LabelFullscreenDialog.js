import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import {
  setDialogOpened,
  setLabelToEdit,
  setFormValue,
  setDeleteAlert,
} from '../../data/labels/actions'
import { LabelForm } from './LabelForm'
import { LabelDeleteAlert } from './LabelDeleteAlert'

const LabelDialogAppBar = styled(AppBar)`
  position: relative;
`

const LabelDialogTitle = styled(Typography)`
  margin-left: 16px;
  flex: 1;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const LabelFullscreenDialog = () => {
  const { formValue } = useSelector((state) => state.labels)

  const { dialogOpened, labelToEdit } = useSelector((state) => state.labels)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setDialogOpened(false))
    dispatch(setLabelToEdit(null))
    dispatch(setFormValue(null))
  }

  const handleSave = () => {
    if (!!labelToEdit) {
      console.log('update existing label')
    } else {
      console.log('create new label')
    }

    handleClose()
  }

  return (
    <>
      <Dialog
        fullScreen
        open={dialogOpened}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-description"
      >
        <LabelDialogAppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <LabelDialogTitle variant="h6">
              {!!labelToEdit ? 'Edit' : 'Create'} Label
            </LabelDialogTitle>

            {!!labelToEdit && (
              <IconButton
                color="inherit"
                onClick={() =>
                  dispatch(
                    setDeleteAlert({ opened: true, labelToDelete: labelToEdit })
                  )
                }
                aria-label="delete label"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <IconButton
              color="inherit"
              aria-label="save label"
              onClick={handleSave}
              disabled={!formValue || !formValue.name || !formValue.color}
            >
              <CheckIcon />
            </IconButton>
          </Toolbar>
        </LabelDialogAppBar>
        <DialogContent>
          <LabelForm />
        </DialogContent>
      </Dialog>

      <LabelDeleteAlert />
    </>
  )
}
