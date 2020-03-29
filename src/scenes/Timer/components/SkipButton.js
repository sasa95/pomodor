import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipNext from '@material-ui/icons/SkipNext'
import { useDispatch, useSelector } from 'react-redux'
import { setNextTimer } from '../actions'

const SkipButton = () => {
  const dispatch = useDispatch()
  const { timeLeft } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)

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

export { SkipButton }
