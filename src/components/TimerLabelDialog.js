import React from 'react'
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
import { setDialogOpened, setLabelToEdit } from '../data/labels/actions'
import { TimerLabelForm } from './TimerLabelForm'
import { useState } from 'react'

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

export const TimerLabelDialog = () => {
  const [alertOpened, setAlertOpened] = useState(false)
  const { dialogOpened, labelToEdit } = useSelector((state) => state.labels)
  const { formValue } = useSelector((state) => state.labels)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setDialogOpened(false))
    dispatch(setLabelToEdit(null))
  }

  const handleSave = () => {
    dispatch(setDialogOpened(false))

    if (!!labelToEdit) {
      console.log('update existing label')
    } else {
      console.log('create new label')
    }
  }

  const handleDelete = () => {
    setAlertOpened(false)
    setTimeout(() => {
      handleClose()
    }, 200)
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
                onClick={() => setAlertOpened(true)}
                aria-label="delete label"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <IconButton
              color="inherit"
              aria-label="save label"
              onClick={handleSave}
              disabled={!formValue.name || !formValue.color}
            >
              <CheckIcon />
            </IconButton>

            {/* <Button
            disabled={!formValue.name || !formValue.color}
            color="inherit"
            onClick={handleSave}
          >
            save
          </Button> */}
          </Toolbar>
        </LabelDialogAppBar>
        <DialogContent>
          <TimerLabelForm />
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this label?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will also delete all the data and statistics related to
            this label.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpened(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
