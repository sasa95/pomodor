import {
  setWorkDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setRounds,
  setShowTimerInTitle,
  setShowNotifications,
  setDarkMode,
  setFirstDayOfTheWeek,
  setSettings,
} from '../actions'

test('should generate action object for setWorkDuration', () => {
  const duration = 30
  const action = setWorkDuration(duration)

  expect(action).toEqual({
    type: 'SET_WORK_DURATION',
    duration,
  })
})

test('should generate action object for setShortBreakDuration', () => {
  const duration = 10
  const action = setShortBreakDuration(duration)

  expect(action).toEqual({
    type: 'SET_SHORT_BREAK_DURATION',
    duration,
  })
})

test('should generate action object for setLongBreakDuration', () => {
  const duration = 30
  const action = setLongBreakDuration(duration)

  expect(action).toEqual({
    type: 'SET_LONG_BREAK_DURATION',
    duration,
  })
})

test('should generate action object for setRounds', () => {
  const rounds = 8
  const action = setRounds(rounds)

  expect(action).toEqual({
    type: 'SET_ROUNDS',
    rounds,
  })
})

test('should generate action object for setShowTimerInTitle', () => {
  const showTimerInTitle = false
  const action = setShowTimerInTitle(showTimerInTitle)

  expect(action).toEqual({
    type: 'SET_SHOW_TIMER_IN_TITLE',
    showTimerInTitle,
  })
})

test('should generate action object for setShowNotifications', () => {
  const showNotifications = false
  const action = setShowNotifications(showNotifications)

  expect(action).toEqual({
    type: 'SET_SHOW_NOTIFICATIONS',
    showNotifications,
  })
})

test('should generate action object for setDarkMode', () => {
  const darkMode = false
  const action = setDarkMode(darkMode)

  expect(action).toEqual({
    type: 'SET_DARK_MODE',
    darkMode,
  })
})

test('should generate action object for setFirstDayOfTheWeek  ', () => {
  const firstDayOfTheWeek = false
  const action = setFirstDayOfTheWeek(firstDayOfTheWeek)

  expect(action).toEqual({
    type: 'SET_FIRST_DAY_OF_THE_WEEK',
    firstDayOfTheWeek,
  })
})

test('should generate action object for setSettings  ', () => {
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
  const action = setSettings(settings)

  expect(action).toEqual({
    type: 'SET_SETTINGS',
    settings,
  })
})
