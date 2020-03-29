import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const CounterLabel = styled.span`
  font-weight: bold;
`

const RoundsCounter = () => {
  const { currentRound, timeLeft } = useSelector((state) => state.timer)
  const { rounds } = useSelector((state) => state.settings)

  return (
    <CounterLabel>
      {timeLeft && currentRound}/{timeLeft && rounds}
    </CounterLabel>
  )
}

export { RoundsCounter }
