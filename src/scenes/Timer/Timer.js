import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'
import SkipNext from '@material-ui/icons/SkipNext'
import Box from '@material-ui/core/Box'

const ROUNDS_NUMBER = 4

const STATUSES = {
  onHold: 'ON_HOLD',
  running: 'RUNNING',
  paused: 'PAUSED',
}

const TIMER_TYPES = {
  work: { id: 'w', duration: 25 },
  shortBreak: { id: 'sb', duration: 5 },
  longBreak: { id: 'lb', duration: 20 },
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

const CounterLabel = styled.span`
  font-weight: bold;
`

const Timer = () => {
  const [progress, setProgress] = useState(100)
  const [timeLeft, setTimeLeft] = useState({
    minutes: TIMER_TYPES.work.duration,
    seconds: 0,
  })
  const [int, setInt] = useState()
  const [status, setStatus] = useState(STATUSES.onHold)
  const [type, setType] = useState(TIMER_TYPES.work.id)
  const [duration, setDuration] = useState(TIMER_TYPES.work.duration)
  const [currentRound, setCurrentRound] = useState(1)

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

      if (!calculatedProgress) {
        setTimeout(() => {
          setupNextTimer(interval)
        }, 1000)
      }
    }, 200)

    setInt(interval)
  }

  const setupNextTimer = interval => {
    setProgress(100)
    clearInterval(interval)
    setInt(null)
    setStatus(STATUSES.onHold)

    if (currentRound < ROUNDS_NUMBER) {
      if (type === TIMER_TYPES.work.id) {
        const { id, duration } = TIMER_TYPES.shortBreak

        setType(id)
        setTimeLeft({ minutes: duration, seconds: 0 })
        setDuration(TIMER_TYPES.shortBreak.duration)
      } else {
        const { id, duration } = TIMER_TYPES.work

        setType(id)
        setTimeLeft({ minutes: duration, seconds: 0 })
        setDuration(duration)
        setCurrentRound(currentRound + 1)
      }
    } else {
      if (type === TIMER_TYPES.work.id) {
        const { id, duration } = TIMER_TYPES.longBreak

        setType(id)
        setTimeLeft({ minutes: duration, seconds: 0 })
        setDuration(duration)
      } else {
        const { id, duration } = TIMER_TYPES.work

        setTimeLeft({ minutes: duration, seconds: 0 })
        setType(id)
        setDuration(duration)
        setCurrentRound(1)
      }
    }
  }

  const resetTimer = () => {
    clearInterval(int)
    setInt(null)
    setTimeLeft({ minutes: duration, seconds: 0 })
    setStatus(STATUSES.onHold)
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
        <CounterLabel>
          {currentRound}/{ROUNDS_NUMBER}
        </CounterLabel>

        <Box display="flex">
          <IconButton aria-label="Reset timer" onClick={resetTimer}>
            <ReplayIcon />
          </IconButton>
          <IconButton
            aria-label="Skip current timer"
            onClick={() => {
              setupNextTimer(int)
            }}
          >
            <SkipNext />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export { Timer }
