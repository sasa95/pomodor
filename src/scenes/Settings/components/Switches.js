import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch } from './components/Switch'
import {
  startSetShowTimerInTitle,
  startSetShowNotifications,
  startSetDarkMode,
  startSetAutostart,
} from '../../../data/settings/actions'

export const Switches = () => {
  const {
    showTimerInTitle,
    showNotifications,
    darkMode,
    autostart,
  } = useSelector((state) => state.settings)

  useEffect(() => {
    if (!showTimerInTitle) {
      document.title = 'Pomodor | Productivity Timer'
    }
  }, [showTimerInTitle])

  return (
    <div>
      <Switch
        name="Timer in title"
        action={startSetShowTimerInTitle}
        checked={showTimerInTitle}
      />
      <Switch
        name="Notifications"
        action={startSetShowNotifications}
        checked={showNotifications}
      />
      <Switch name="Autostart" action={startSetAutostart} checked={autostart} />
      <Switch name="Dark mode" action={startSetDarkMode} checked={darkMode} />
    </div>
  )
}
