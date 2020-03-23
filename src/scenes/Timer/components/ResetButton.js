import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import { useDispatch, useSelector } from 'react-redux'
import { resetTimer } from '../actions'
import { setTitle } from '../reducer'
import { useEffect } from 'react'

const ResetButton = () => {
  const dispatch = useDispatch()
  const { type, duration, status } = useSelector(state => state.timer)

  useEffect(() => {
    setTitle(type, { minutes: duration, seconds: 0 })
  }, [duration, status, type])

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
