/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import { setTimeLeft } from '../data/timer/actions'
import { STATUSES, TYPES } from '../data/timer/reducer'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

export const CountdownCircle = () => {
  const { timeLeft, progress, status, type } = useSelector(
    (state) => state.timer
  )

  const { workDuration, shortBreakDuration, longBreakDuration } = useSelector(
    (state) => state.settings
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.work &&
      workDuration &&
      (!timeLeft || timeLeft.minutes !== workDuration)
    ) {
      dispatch(setTimeLeft({ minutes: workDuration, seconds: 0 }))
    }
  }, [workDuration])

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.shortBreak &&
      timeLeft &&
      timeLeft.minutes !== shortBreakDuration
    ) {
      dispatch(setTimeLeft({ minutes: shortBreakDuration, seconds: 0 }))
    }
  }, [shortBreakDuration])

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.longBreak &&
      timeLeft &&
      timeLeft.minutes !== longBreakDuration
    ) {
      dispatch(setTimeLeft({ minutes: longBreakDuration, seconds: 0 }))
    }
  }, [longBreakDuration])

  return (
    <CircleContainer>
      <Circle variant="static" value={100} size={200} color="secondary" />
      <Circle
        variant={timeLeft ? 'static' : 'indeterminate'}
        value={progress}
        size={200}
        color="primary"
      />
      {timeLeft && (
        <Time>
          {timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:
          {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
        </Time>
      )}

      <TimerTypeContainer>
        <TimerType variant="subtitle2" color="textSecondary">
          {type === 'WORK' ? 'FOCUS' : 'BREAK'}
        </TimerType>
      </TimerTypeContainer>
    </CircleContainer>
  )
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
const TimerTypeContainer = styled(Box)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`

const TimerType = styled(Typography)`
  letter-spacing: 1px;
`

export { Time, TimerType }
