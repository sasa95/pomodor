import { STATUSES } from '../reducer'
import {
  setStatus,
  setProgress,
  saveInterval,
  pauseTimer,
  resetTimer,
  setNextTimer,
  setSaveSessionAlert,
} from '../actions'

test('should generate action object for setStatus', () => {
  const status = STATUSES.onHold
  const action = setStatus(status)

  expect(action).toEqual({
    type: 'SET_STATUS',
    status,
  })
})

test('should generate action object for setProgress', () => {
  const progress = 100
  const action = setProgress(progress)

  expect(action).toEqual({
    type: 'SET_PROGRESS',
    progress,
  })
})

test('should generate action object for saveInterval', () => {
  const interval = 123
  const action = saveInterval(interval)

  expect(action).toEqual({
    type: 'SAVE_INTERVAL',
    interval,
  })
})

test('should generate action object for pauseTimer', () => {
  const action = pauseTimer()

  expect(action).toEqual({
    type: 'PAUSE_TIMER',
  })
})

test('should generate action object for resetTimer', () => {
  const duration = 25
  const showTimerInTitle = true
  const action = resetTimer({ duration, showTimerInTitle })

  expect(action).toEqual({
    type: 'RESET_TIMER',
    duration,
    showTimerInTitle,
  })
})

test('should generate action object for setNextTimer', () => {
  const settings = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 20,
    rounds: 4,
    showTimerInTitle: true,
    showNotifications: true,
    darkMode: false,
    firstDayOfTheWeek: 'Monday',
  }

  const action = setNextTimer(settings)

  expect(action).toEqual({
    type: 'SET_NEXT_TIMER',
    settings,
  })
})

test('should generate action object for setSaveSessionAlert', () => {
  const saveSessionAlert = true
  const action = setSaveSessionAlert(saveSessionAlert)

  expect(action).toEqual({
    type: 'SET_SAVE_SESSION_ALERT',
    saveSessionAlert,
  })
})
