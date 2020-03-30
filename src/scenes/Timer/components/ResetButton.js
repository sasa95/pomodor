import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import { useDispatch, useSelector } from 'react-redux'
import { resetTimer } from '../actions'
import { TYPES } from '../reducer'

const ResetButton = () => {
  const dispatch = useDispatch()
  const { type, timeLeft } = useSelector((state) => state.timer)
  const {
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    showTimerInTitle,
  } = useSelector((state) => state.settings)

  const handleClick = () => {
    let duration

    switch (type) {
      case TYPES.work:
        duration = workDuration
        break
      case TYPES.shortBreak:
        duration = shortBreakDuration
        break
      case TYPES.longBreak:
        duration = longBreakDuration
        break
      default:
        break
    }
    dispatch(resetTimer({ duration, showTimerInTitle }))
  }

  return (
    <IconButton
      disabled={!timeLeft}
      aria-label="Reset timer"
      onClick={handleClick}
    >
      <ReplayIcon />
    </IconButton>
  )
}

export { ResetButton }
