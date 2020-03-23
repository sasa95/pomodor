import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipNext from '@material-ui/icons/SkipNext'
import { useDispatch, useSelector } from 'react-redux'
import { setNextTimer } from '../actions'
import { setTitle } from '../reducer'

const SkipButton = () => {
  const dispatch = useDispatch()
  const { duration, type } = useSelector(state => state.timer)

  useEffect(() => {
    setTitle(type, { minutes: duration, seconds: 0 })
  }, [duration, type])

  return (
    <IconButton
      aria-label="Skip current timer"
      onClick={() => dispatch(setNextTimer())}
    >
      <SkipNext />
    </IconButton>
  )
}

export { SkipButton }
