import React, { useState } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import { useDispatch, useSelector } from 'react-redux'
import { resetTimer, setSaveSessionAlert } from '../data/timer/actions'
import { TYPES, STATUSES } from '../data/timer/reducer'
import { SaveSessionAlert } from './SaveSessionAlert'

export const ResetButton = () => {
  const { type, timeLeft, status } = useSelector((state) => state.timer)
  const {
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    showTimerInTitle,
  } = useSelector((state) => state.settings)

  const [timeToSave, setTimeToSave] = useState({ minutes: 0, seconds: 0 })

  const dispatch = useDispatch()

  const handleClick = () => {
    if (type === TYPES.work) {
      const secondsTotal = workDuration * 60
      const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds
      const secondsDiff = secondsTotal - secondsLeft

      const minutesToSave = Math.floor(secondsDiff / 60)
      const secondsToSave = secondsDiff % 60

      if (minutesToSave) {
        setTimeToSave({
          minutes: minutesToSave,
          seconds: secondsToSave,
        })

        dispatch(setSaveSessionAlert(true))
      }
    }

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
    <>
      <ActionIcon
        disabled={status === STATUSES.onHold}
        aria-label="Reset timer"
        onClick={handleClick}
        size="small"
      >
        <ReplayIcon />
      </ActionIcon>
      <SaveSessionAlert time={timeToSave} />
    </>
  )
}

export const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`
