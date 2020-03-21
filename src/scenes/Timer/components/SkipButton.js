import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SkipNext from '@material-ui/icons/SkipNext'
import { useDispatch } from 'react-redux'
import { setNextTimer } from '../actions'

const SkipButton = () => {
  const dispatch = useDispatch()

  return (
    <IconButton
      aria-label="Skip current timer"
      onClick={() => {
        dispatch(setNextTimer())
      }}
    >
      <SkipNext />
    </IconButton>
  )
}

export { SkipButton }
