import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import MatDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import { LabelForm } from './LabelForm'
import { DeleteAlert } from './DeleteAlert'
import {
  setFullscreenDialog,
  setLabelEditting,
  setFormValue,
  setDeleteAlert,
  startEditLabel,
  startAddLabel,
} from '../../../../data/labels/actions'

export const FullscreenDialog = () => {
  const { formValue } = useSelector((state) => state.labels)
  const darkMode = useSelector((state) => +state.settings.darkMode)

  const { fullscreenDialog, labelEditting } = useSelector(
    (state) => state.labels
  )

  const dispatch = useDispatch()

  const handleSave = () => {
    if (labelEditting) {
      dispatch(startEditLabel(labelEditting.id, formValue))
    } else {
      dispatch(startAddLabel(formValue))
    }

    handleClose()
  }

  const handleClose = () => {
    dispatch(setFullscreenDialog(false))
    dispatch(setLabelEditting(null))
    dispatch(setFormValue(null))
  }

  const openDeleteAlert = () => {
    dispatch(setDeleteAlert(true))
  }

  return (
    <>
      <Dialog
        fullScreen
        open={fullscreenDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-description"
        dark={darkMode}
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
              {!!labelEditting ? 'Edit' : 'Create'} Label
            </LabelDialogTitle>

            {!!labelEditting && (
              <IconButton
                color="inherit"
                onClick={openDeleteAlert}
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

      <DeleteAlert />
    </>
  )
}

const DialogContent = styled(MatDialogContent)`
  ${({ dark }) =>
    dark &&
    css`
      background: #252525;
    `}
`

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
