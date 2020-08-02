import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { useTheme } from '@material-ui/core'
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
import useMounted from '../../../helpers/useMounted'

export const ToggleButton = () => {
  const { status, timeLeft, type } = useSelector((state) => state.timer)
  const settings = useSelector((state) => state.settings)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  const label = useSelector((state) => state.labels.labelSelected)

  const dispatch = useDispatch()

  const audio = new Audio(chime)

  const startTimer = () => {
    if (status === STATUSES.running) return

    if (settings.showNotifications && 'Notification' in window) {
      Notification.requestPermission()
    }

    dispatch(setStatus(STATUSES.running))

    const endTime = new Date(
      new Date().getTime() + timeLeft.minutes * 60000 + timeLeft.seconds * 1000
    )

    const duration = getTimerDuration()

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(endTime)
      const calculatedProgress = calculateProgress(duration, calculatedTimeLeft)

      dispatch(setTimeLeft(calculatedTimeLeft))
      dispatch(setProgress(calculatedProgress))

      if (settings.showTimerInTitle) {
        setTitle(type, calculatedTimeLeft)
      }

      if (!calculatedProgress) {
        if (type === TYPES.work) {
          dispatch(
            startAddSession({
              label: label ? label.id : null,
              duration: { minutes: settings.workDuration, seconds: 0 },
              createdAt: Date.now(),
            })
          )
        }

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

  const getTimerDuration = () => {
    switch (type) {
      case TYPES.work:
        return settings.workDuration
      case TYPES.shortBreak:
        return settings.shortBreakDuration
      case TYPES.longBreak:
        return settings.longBreakDuration
      default:
        break
    }
  }

  const theme = useTheme()
  const isMount = useMounted()

  useEffect(() => {
    if (isMount) return

    if (settings.autostart) {
      startTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <Box display="flex" justifyContent="center">
      {status !== STATUSES.running && (
        <ActionIcon
          disabled={!timeLeft}
          aria-label="start timer"
          onClick={startTimer}
          color="primary"
          dark={darkMode || darkModeCached}
          theme={theme}
        >
          <PlayArrowIcon />
        </ActionIcon>
      )}

      {status === STATUSES.running && (
        <ActionIcon
          color="primary"
          aria-label="pause timer"
          dark={darkMode || darkModeCached}
          theme={theme}
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

export const ActionIcon = styled(IconButton)`
  color: ${({ dark, theme }) =>
    dark ? theme.palette.primary.light : theme.palette.primary.main};

  border: 1px solid
    ${({ dark, theme }) =>
      dark ? theme.palette.primary.light : theme.palette.primary.main};
`
