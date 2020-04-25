import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipNext from '@material-ui/icons/SkipNext'
import { useDispatch, useSelector } from 'react-redux'
import { setNextTimer } from '../data/timer/actions'

export const SkipButton = () => {
  const { timeLeft } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  return (
    <IconButton
      disabled={!timeLeft}
      aria-label="Skip current timer"
      onClick={() => dispatch(setNextTimer(settings))}
    >
      <SkipNext />
    </IconButton>
  )
}
