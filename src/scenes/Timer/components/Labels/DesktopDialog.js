import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import MatDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { LabelForm } from './LabelForm'
import {
  setDesktopDialog,
  startAddLabel,
  startEditLabel,
  setFormValue,
  setLabelEditting,
} from '../../../../data/labels/actions'
import { useTheme } from '@material-ui/core'

export const DesktopDialog = () => {
  const { desktopDialog, formValue, labelEditting } = useSelector(
    (state) => state.labels
  )

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    if (labelEditting) {
      dispatch(startEditLabel(labelEditting.id, formValue))
    } else {
      dispatch(startAddLabel(formValue))
    }

    handleClose()
  }

  const handleClose = () => {
    dispatch(setDesktopDialog(false))
    dispatch(setLabelEditting(null))
    dispatch(setFormValue(null))
  }

  const theme = useTheme()

  return (
    <div>
      <Dialog
        open={desktopDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={true}
        dark={darkMode}
        theme={theme}
      >
        <DialogTitle id="form-dialog-title">Edit Label</DialogTitle>
        <DialogContent>
          <LabelForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!formValue || !formValue.name || !formValue.color}
            onClick={handleConfirm}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const Dialog = styled(MatDialog)`
  ${({ dark, theme }) =>
    dark &&
    css`
      .MuiPaper-root {
        background: #252525;
      }

      .MuiButton-textPrimary:not(.Mui-disabled) {
        color: ${theme.palette.primary.light};
      }
    `}
`
