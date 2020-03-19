import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import SkipNext from '@material-ui/icons/SkipNext'
import Box from '@material-ui/core/Box'

// Timer duration in minutes
const DURATION = 25

const STATUSES = {
  initial: 'INITIAL',
  running: 'RUNNING',
  paused: 'PAUSED',
}

const CircleContainer = styled.div`
  position: relative;
  margin: 20px auto 0;
  height: 200px;
  width: 200px;
`

const Circle = styled(CircularProgress)`
  position: absolute;
  top: 0;
`

const Time = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  white-space: pre;
`

const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`

const Timer = () => {
  const [progress, setProgress] = useState(100)
  const [timeLeft, setTimeLeft] = useState({ minutes: DURATION, seconds: 0 })
  const [int, setInt] = useState()
  const [status, setStatus] = useState(STATUSES.initial)

  const calculateTimeLeft = endTime => {
    const difference = +endTime - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const calculateProgress = timeLeft => {
    const secondsTotal = DURATION * 60
    const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds

    return 100 / (secondsTotal / secondsLeft)
  }

  const startTimer = () => {
    if (int) return

    setStatus(STATUSES.running)

    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const interval = setInterval(() => {
      const calculatedTime = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(calculatedTime)

      setTimeLeft(calculatedTime)
      setProgress(calculatedProgress)
    }, 200)

    setInt(interval)
  }

  const stopTimer = () => {
    clearInterval(int)
    setInt(null)
    setTimeLeft({ minutes: DURATION, seconds: 0 })
    setStatus(STATUSES.initial)
    setProgress(100)
  }

  const pauseTimer = () => {
    setStatus(STATUSES.paused)
    clearInterval(int)
    setInt(null)
  }

  return (
    <Box width={300} m="auto">
      <CircleContainer>
        <Circle variant="static" value={100} size={200} color="secondary" />
        <Circle variant="static" value={progress} size={200} />
        {timeLeft && (
          <Time>
            {timeLeft.minutes}:
            {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
          </Time>
        )}
      </CircleContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        {status !== STATUSES.running && (
          <ActionIcon aria-label="start timer" onClick={startTimer}>
            <PlayArrowIcon />
          </ActionIcon>
        )}

        {status === STATUSES.running && (
          <ActionIcon aria-label="pause timer" onClick={pauseTimer}>
            <PauseIcon />
          </ActionIcon>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <span>1/4</span>

        <Box display="flex">
          <IconButton aria-label="Stop timer" onClick={stopTimer}>
            <StopIcon />
          </IconButton>
          <IconButton aria-label="Skip current timer" onClick={() => {}}>
            <SkipNext />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export { Timer }
