import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

// Timer duration in minutes
const DURATION = 1

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
    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const int = setInterval(() => {
      const calculatedTime = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(calculatedTime)

      setTimeLeft(calculatedTime)
      setProgress(calculatedProgress)
    }, 200)

    setInt(int)
  }

  const stopTimer = () => {
    clearInterval(int)
    setTimeLeft({ minutes: DURATION, seconds: 0 })
    setProgress(100)
  }

  const pauseTimer = () => {
    clearInterval(int)
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

      <Button variant="contained" onClick={startTimer}>
        Start
      </Button>

      <Button variant="contained" onClick={stopTimer}>
        Stop
      </Button>

      <Button variant="contained" onClick={pauseTimer}>
        Pause
      </Button>

      <Button variant="contained" onClick={startTimer}>
        Resume
      </Button>
    </div>
  )
}

export { Timer }
