import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector } from 'react-redux'

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

const CountdownCircle = () => {
  const { timeLeft, progress } = useSelector(state => state.timer)

  return (
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
  )
}

export { CountdownCircle }
