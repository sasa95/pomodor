import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch } from './components/Switch'
import {
  startSetShowTimerInTitle,
  startSetShowNotifications,
  startSetDarkMode,
} from '../../../data/settings/actions'

export const Switches = () => {
  const { showTimerInTitle, showNotifications, darkMode } = useSelector(
    (state) => state.settings
  )

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
      <Switch name="Dark mode" action={startSetDarkMode} checked={darkMode} />
    </div>
  )
}
