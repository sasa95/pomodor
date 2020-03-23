import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { useDispatch, useSelector } from 'react-redux'
import { setNextTimer } from '../actions'
import { STATUSES, setTitle } from '../reducer'
import {
  setStatus,
  setTimeLeft,
  setProgress,
  pauseTimer,
  saveInterval,
} from '../actions'

const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`

const ToggleButton = () => {
  const { status, timeLeft, duration, type } = useSelector(state => state.timer)

  const dispatch = useDispatch()

  const calculateTimeLeft = endTime => {
    const difference = +endTime - +new Date()
    let timeLeft = { minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const calculateProgress = timeLeft => {
    const secondsTotal = duration * 60
    const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds

    return 100 / (secondsTotal / secondsLeft)
  }

  const startTimer = () => {
    if (status === STATUSES.running) return

    dispatch(setStatus(STATUSES.running))

    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(calculatedTimeLeft)

      dispatch(setTimeLeft(calculatedTimeLeft))
      dispatch(setProgress(calculatedProgress))

      setTitle(type, calculatedTimeLeft)

      if (!calculatedProgress) {
        setTimeout(() => {
          dispatch(setNextTimer())
        }, 1000)

        clearInterval(interval)
      }
    }, 200)

    dispatch(saveInterval(interval))
  }

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      {status !== STATUSES.running && (
        <ActionIcon aria-label="start timer" onClick={startTimer}>
          <PlayArrowIcon />
        </ActionIcon>
      )}

      {status === STATUSES.running && (
        <ActionIcon
          aria-label="pause timer"
          onClick={() => {
            dispatch(pauseTimer())
          }}
        >
          <PauseIcon />
        </ActionIcon>
      )}
    </Box>
  )
}

export { ToggleButton }
