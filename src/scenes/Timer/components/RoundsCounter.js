import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ROUNDS_NUMBER = 4

const CounterLabel = styled.span`
  font-weight: bold;
`

const RoundsCounter = () => {
  const { currentRound } = useSelector((state) => state.timer)

  return (
    <CounterLabel>
      {currentRound}/{ROUNDS_NUMBER}
    </CounterLabel>
  )
}

export { RoundsCounter }
