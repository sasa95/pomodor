import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { setSaveSessionAlert } from '../data/timer/actions'
import { startAddSession } from '../../../data/sessions/actions'

const Time = styled.span`
  color: ${({ color }) => color};
`

export const SaveSessionAlert = ({ time }) => {
  const { saveSessionAlert } = useSelector((state) => state.timer)
  const label = useSelector((state) => state.labels.labelSelected)

  const theme = useTheme()

  const dispatch = useDispatch()

  const closeAlert = () => {
    dispatch(setSaveSessionAlert(false))
  }

  const saveSession = () => {
    dispatch(
      startAddSession({
        duration: time,
        label: label ? label.id : null,
        createdAt: Date.now(),
      })
    )
    closeAlert()
  }

  return (
    <Dialog
      open={saveSessionAlert}
      onClose={closeAlert}
      aria-labelledby="save-session-alert-title"
      aria-describedby="save-session-alert-description"
    >
      <DialogTitle id="save-session-alert-title">Save session?</DialogTitle>
      <DialogContent>
        <DialogContentText id="save-session-alert-description">
          Do you want to save{' '}
          <Time color={theme.palette.secondary.main}>
            {time.minutes < 10 ? '0' + time.minutes : time.minutes}:
            {time.seconds < 10 ? '0' + time.seconds : time.seconds}
          </Time>{' '}
          to the statistics?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAlert}>Don't save</Button>
        <Button onClick={saveSession} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
