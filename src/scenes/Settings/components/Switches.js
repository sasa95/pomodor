import React, { useEffect } from 'react'
import { Switch } from './components/Switch'
import { useSelector } from 'react-redux'
import {
  startSetShowTimerInTitle,
  startSetShowNotifications,
} from '../../../data/settings/actions'

const Switches = () => {
  const { showTimerInTitle, showNotifications } = useSelector(
    (state) => state.settings
  )

  useEffect(() => {
    if (!showTimerInTitle) {
      document.title = 'Pomodor'
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
    </div>
  )
}

export { Switches }
