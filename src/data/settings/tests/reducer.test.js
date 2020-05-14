import { reducer, initialState } from '../reducer'

test('should setup default settings state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(initialState)
})

test('should set work duration', () => {
  const duration = 30

  const state = reducer(initialState, {
    type: 'SET_WORK_DURATION',
    duration,
  })

  expect(state.workDuration).toBe(duration)
})

test('should set short break duration', () => {
  const duration = 10

  const state = reducer(initialState, {
    type: 'SET_SHORT_BREAK_DURATION',
    duration,
  })

  expect(state.shortBreakDuration).toBe(duration)
})

test('should set long break duration', () => {
  const duration = 30

  const state = reducer(initialState, {
    type: 'SET_LONG_BREAK_DURATION',
    duration,
  })

  expect(state.longBreakDuration).toBe(duration)
})

test('should set rounds', () => {
  const rounds = 8

  const state = reducer(initialState, {
    type: 'SET_ROUNDS',
    rounds,
  })

  expect(state.rounds).toBe(rounds)
})

test('should show timer in title', () => {
  const showTimerInTitle = true

  const state = reducer(initialState, {
    type: 'SET_SHOW_TIMER_IN_TITLE',
    showTimerInTitle,
  })

  expect(state.showTimerInTitle).toBe(showTimerInTitle)
})

test('should enable notifications', () => {
  const showNotifications = true

  const state = reducer(initialState, {
    type: 'SET_SHOW_NOTIFICATIONS',
    showNotifications,
  })

  expect(state.showNotifications).toBe(showNotifications)
})

test('should enable dark mode', () => {
  const darkMode = true

  const state = reducer(initialState, {
    type: 'SET_DARK_MODE',
    darkMode,
  })

  expect(state.darkMode).toBe(darkMode)
})

test('should set sunday as the first day of the week', () => {
  const firstDayOfTheWeek = 'Sunday'

  const state = reducer(initialState, {
    type: 'SET_FIRST_DAY_OF_THE_WEEK',
    firstDayOfTheWeek,
  })

  expect(state.firstDayOfTheWeek).toBe(firstDayOfTheWeek)
})

test('should set settings', () => {
  const state = reducer(initialState, {
    type: 'SET_SETTINGS',
    settings: initialState,
  })

  expect(state).toEqual(initialState)
})
