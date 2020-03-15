import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'

// Timer duration in minutes
const DURATION = 25

const Container = styled.div`
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
    setProgress(100)
  }

  const pauseTimer = () => {
    clearInterval(int)
    setInt(null)
  }

  return (
    <div>
      <Container>
        <Circle variant="static" value={100} size={200} color="secondary" />
        <Circle variant="static" value={progress} size={200} />
        {timeLeft && (
          <Time>
            {timeLeft.minutes}:
            {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
          </Time>
        )}
      </Container>

      <ActionIcon aria-label="delete" onClick={startTimer}>
        <PlayArrowIcon />
      </ActionIcon>

      <ActionIcon aria-label="delete" onClick={stopTimer}>
        <StopIcon />
      </ActionIcon>

      <ActionIcon aria-label="delete" onClick={pauseTimer}>
        <PauseIcon />
      </ActionIcon>

      <ActionIcon aria-label="delete" onClick={startTimer}>
        <PlayArrowIcon />
      </ActionIcon>
    </div>
  )
}

export { Timer }
