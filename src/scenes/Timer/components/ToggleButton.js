import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNextTimer,
  setStatus,
  setTimeLeft,
  setProgress,
  pauseTimer,
  saveInterval,
} from '../data/timer/actions'
import { STATUSES, TYPES, setTitle } from '../data/timer/reducer'
import chime from '../assets/chime.mp3'
import work from '../assets/work.png'
import alarm from '../assets/alarm.png'
import coffee from '../assets/coffee.png'
import { startAddSession } from '../../../data/sessions/actions'

const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`

export const ToggleButton = () => {
  const { status, timeLeft, type } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)
  const label = useSelector((state) => state.labels.labelSelected)

  const dispatch = useDispatch()

  const audio = new Audio(chime)

  const calculateTimeLeft = (endTime) => {
    const difference = +endTime - +new Date()
    let timeLeft = { minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const calculateProgress = (duration, timeLeft) => {
    const secondsTotal = duration * 60
    const secondsLeft = timeLeft.minutes * 60 + timeLeft.seconds

    return 100 / (secondsTotal / secondsLeft)
  }

  const startTimer = () => {
    if (status === STATUSES.running) return

    if (settings.showNotifications && 'Notification' in window) {
      Notification.requestPermission()
    }

    dispatch(setStatus(STATUSES.running))

    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const duration = timeLeft.minutes

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(duration, calculatedTimeLeft)

      dispatch(setTimeLeft(calculatedTimeLeft))
      dispatch(setProgress(calculatedProgress))

      if (settings.showTimerInTitle) {
        setTitle(type, calculatedTimeLeft)
      }

      if (!calculatedProgress) {
        dispatch(
          startAddSession({
            label: label ? label.id : null,
            duration: { minutes: settings.workDuration, seconds: 0 },
          })
        )

        setTimeout(async () => {
          dispatch(setNextTimer(settings))
          audio.play()

          if (
            settings.showNotifications &&
            'Notification' in window &&
            Notification.permission === 'granted'
          ) {
            const msg =
              type === TYPES.work ? 'Take a break ☕️' : 'Start working 👨‍💻'

            const icon = type === TYPES.work ? coffee : work

            const registration = await navigator.serviceWorker.ready

            registration.showNotification(msg, {
              vibrate: [100, 50, 100],
              badge: alarm,
              icon,
            })
          }
        }, 1000)

        clearInterval(interval)
      }
    }, 200)

    dispatch(saveInterval(interval))
  }

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      {status !== STATUSES.running && (
        <ActionIcon
          disabled={!timeLeft}
          aria-label="start timer"
          onClick={startTimer}
        >
          <PlayArrowIcon />
        </ActionIcon>
      )}

      {status === STATUSES.running && (
        <ActionIcon
          aria-label="pause timer"
          onClick={() => {
            dispatch(pauseTimer())
          }}
        >
          <PauseIcon />
        </ActionIcon>
      )}
    </Box>
  )
}
