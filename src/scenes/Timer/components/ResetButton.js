import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import { useDispatch } from 'react-redux'
import { resetTimer } from '../actions'

const ResetButton = () => {
  const dispatch = useDispatch()

  return (
    <IconButton
      aria-label="Reset timer"
      onClick={() => {
        dispatch(resetTimer())
      }}
    >
      <ReplayIcon />
    </IconButton>
  )
}

export { ResetButton }
