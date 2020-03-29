import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ROUNDS_NUMBER = 4

const CounterLabel = styled.span`
  font-weight: bold;
`

const RoundsCounter = () => {
  const { currentRound, timeLeft } = useSelector((state) => state.timer)

  return (
    <CounterLabel>
      {timeLeft && currentRound}/{timeLeft && ROUNDS_NUMBER}
    </CounterLabel>
  )
}

export { RoundsCounter }
