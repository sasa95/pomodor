import {
  reducer,
  STATUSES,
  TYPES,
  initialState as initialTimerState,
} from '../reducer'
import { initialState as initialSettingsState } from '../../../../../data/settings/reducer'

test('should setup default timer state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(initialTimerState)
})

test('should set timer status', () => {
  const currentState = { ...initialTimerState }
  const status = STATUSES.running
  const state = reducer(currentState, {
    type: 'SET_STATUS',
    status,
  })

  expect(state.status).toBe(status)
})

test('should set timer progress', () => {
  const currentState = { ...initialTimerState }
  const progress = 99
  const state = reducer(currentState, {
    type: 'SET_PROGRESS',
    progress,
  })

  expect(state.progress).toBe(progress)
})

test('should set timer time left', () => {
  const currentState = { ...initialTimerState }
  const timeLeft = { minutes: 24, seconds: 59 }
  const state = reducer(currentState, {
    type: 'SET_TIME_LEFT',
    timeLeft,
  })
  expect(state.timeLeft).toEqual(timeLeft)
})

test('should save timer interval', () => {
  const currentState = { ...initialTimerState }
  const interval = 123
  const state = reducer(currentState, {
    type: 'SAVE_INTERVAL',
    interval,
  })
  expect(state.interval).toEqual(interval)
})

test('should pause timer', () => {
  const currentState = { ...initialTimerState, status: STATUSES.running }
  const state = reducer(currentState, {
    type: 'PAUSE_TIMER',
  })
  expect(state).toMatchObject({
    status: STATUSES.paused,
    interval: null,
  })
})

test('should reset timer', () => {
  const currentState = {
    ...initialTimerState,
    timeLeft: { minutes: 9, seconds: 11 },
  }
  const duration = 25
  const showTimerInTitle = true

  const state = reducer(currentState, {
    type: 'RESET_TIMER',
    duration,
    showTimerInTitle,
  })

  expect(state).toMatchObject({
    status: STATUSES.onHold,
    interval: null,
    timeLeft: { minutes: duration, seconds: 0 },
    progress: 100,
  })
})

describe('set next timer', () => {
  const settings = {
    ...initialSettingsState,
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    rounds: 4,
  }

  test('should set next timer to short break timer', () => {
    const currentState = {
      ...initialTimerState,
      currentRound: 2,
      type: TYPES.work,
    }

    const state = reducer(currentState, {
      type: 'SET_NEXT_TIMER',
      settings,
    })

    expect(state).toMatchObject({
      status: STATUSES.onHold,
      progress: 100,
      interval: null,
      type: TYPES.shortBreak,
      timeLeft: { minutes: settings.shortBreakDuration, seconds: 0 },
      currentRound: 2,
    })
  })

  test('should set next timer to work timer and round 3', () => {
    const currentState = {
      ...initialTimerState,
      currentRound: 2,
      type: TYPES.shortBreak,
    }

    const state = reducer(currentState, {
      type: 'SET_NEXT_TIMER',
      settings,
    })

    expect(state).toMatchObject({
      status: STATUSES.onHold,
      progress: 100,
      interval: null,
      type: TYPES.work,
      timeLeft: { minutes: settings.workDuration, seconds: 0 },
      currentRound: 3,
    })
  })

  test('should set next timer to long break timer', () => {
    const currentState = {
      ...initialTimerState,
      currentRound: 4,
      type: TYPES.work,
    }

    const state = reducer(currentState, {
      type: 'SET_NEXT_TIMER',
      settings,
    })

    expect(state).toMatchObject({
      status: STATUSES.onHold,
      progress: 100,
      interval: null,
      type: TYPES.longBreak,
      timeLeft: { minutes: settings.longBreakDuration, seconds: 0 },
      currentRound: 4,
    })
  })

  test('should set next timer to work timer and round 1', () => {
    const currentState = {
      ...initialTimerState,
      currentRound: 4,
      type: TYPES.longBreak,
    }

    const state = reducer(currentState, {
      type: 'SET_NEXT_TIMER',
      settings,
    })

    expect(state).toMatchObject({
      status: STATUSES.onHold,
      progress: 100,
      interval: null,
      type: TYPES.work,
      timeLeft: { minutes: settings.workDuration, seconds: 0 },
      currentRound: 1,
    })
  })
})

test('should set save session alert', () => {
  const saveSessionAlert = true
  const currentState = { ...initialTimerState }
  const state = reducer(currentState, {
    type: 'SET_SAVE_SESSION_ALERT',
    saveSessionAlert,
  })

  expect(state.saveSessionAlert).toBe(saveSessionAlert)
})
