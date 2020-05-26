import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
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
  startSetWorkDuration,
  startSetShortBreakDuration,
  startSetLongBreakDuration,
  startSetRounds,
  startSetShowTimerInTitle,
  startSetShowNotifications,
  startSetDarkMode,
  startSetSettings,
  startSetFirstDayOfTheWeek,
} from '../actions'
import fs from '../../../firebase/firebase'
import { initialState } from '../reducer'

const uid = 'asdf1234'
const defaultAuthState = { auth: { uid }, settings: initialState }
const createMockStore = configureMockStore([thunk])

jest.setTimeout(15000)

beforeEach(async (done) => {
  await fs.doc(`users/${uid}`).set({ settings: initialState })
  done()
})

test('should generate action object for setWorkDuration', () => {
  const duration = 50
  const action = setWorkDuration(duration)

  expect(action).toEqual({
    type: 'SET_WORK_DURATION',
    duration,
  })
})

test('should update work duration in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const duration = 50

  await store.dispatch(startSetWorkDuration(duration))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_WORK_DURATION',
    duration,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.workDuration).toBe(actions[0].duration)

  done()
})

test('should generate action object for setShortBreakDuration', () => {
  const duration = 10
  const action = setShortBreakDuration(duration)

  expect(action).toEqual({
    type: 'SET_SHORT_BREAK_DURATION',
    duration,
  })
})

test('should update short break duration in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const duration = 10

  await store.dispatch(startSetShortBreakDuration(duration))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_SHORT_BREAK_DURATION',
    duration,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.shortBreakDuration).toBe(actions[0].duration)

  done()
})

test('should generate action object for setLongBreakDuration', () => {
  const duration = 15
  const action = setLongBreakDuration(duration)

  expect(action).toEqual({
    type: 'SET_LONG_BREAK_DURATION',
    duration,
  })
})

test('should update long break duration in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const duration = 15

  await store.dispatch(startSetLongBreakDuration(duration))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_LONG_BREAK_DURATION',
    duration,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.longBreakDuration).toBe(actions[0].duration)

  done()
})

test('should generate action object for setRounds', () => {
  const rounds = 8
  const action = setRounds(rounds)

  expect(action).toEqual({
    type: 'SET_ROUNDS',
    rounds,
  })
})

test('should update rounds number in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const rounds = 8

  await store.dispatch(startSetRounds(rounds))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_ROUNDS',
    rounds,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.rounds).toBe(actions[0].rounds)

  done()
})

test('should generate action object for setShowTimerInTitle', () => {
  const showTimerInTitle = false
  const action = setShowTimerInTitle(showTimerInTitle)

  expect(action).toEqual({
    type: 'SET_SHOW_TIMER_IN_TITLE',
    showTimerInTitle,
  })
})

test('should update show timer in title option in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const showTimerInTitle = false

  await store.dispatch(startSetShowTimerInTitle(showTimerInTitle))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_SHOW_TIMER_IN_TITLE',
    showTimerInTitle,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.showTimerInTitle).toBe(
    actions[0].showTimerInTitle
  )

  done()
})

test('should generate action object for setShowNotifications', () => {
  const showNotifications = false
  const action = setShowNotifications(showNotifications)

  expect(action).toEqual({
    type: 'SET_SHOW_NOTIFICATIONS',
    showNotifications,
  })
})

test('should update show notifications option in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const showNotifications = false

  await store.dispatch(startSetShowNotifications(showNotifications))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_SHOW_NOTIFICATIONS',
    showNotifications,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.showNotifications).toBe(
    actions[0].showNotifications
  )

  done()
})

test('should generate action object for setDarkMode', () => {
  const darkMode = true
  const action = setDarkMode(darkMode)

  expect(action).toEqual({
    type: 'SET_DARK_MODE',
    darkMode,
  })
})

test('should update show dark mode option in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const darkMode = true

  await store.dispatch(startSetDarkMode(darkMode))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_DARK_MODE',
    darkMode,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.darkMode).toBe(actions[0].darkMode)

  done()
})

test('should generate action object for setFirstDayOfTheWeek  ', () => {
  const firstDayOfTheWeek = 'Sunday'
  const action = setFirstDayOfTheWeek(firstDayOfTheWeek)

  expect(action).toEqual({
    type: 'SET_FIRST_DAY_OF_THE_WEEK',
    firstDayOfTheWeek,
  })
})

test('should update first day of the week option in database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const firstDayOfTheWeek = 'Sunday'

  await store.dispatch(startSetFirstDayOfTheWeek(firstDayOfTheWeek))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_FIRST_DAY_OF_THE_WEEK',
    firstDayOfTheWeek,
  })

  const docRef = await fs.doc(`users/${uid}/`).get()

  expect(docRef.data().settings.firstDayOfTheWeek).toBe(
    actions[0].firstDayOfTheWeek
  )

  done()
})

test('should generate action object for setSettings  ', () => {
  const settings = {
    workDuration: 50,
    shortBreakDuration: 15,
    longBreakDuration: 30,
    rounds: 8,
    showTimerInTitle: false,
    showNotifications: true,
    darkMode: true,
    firstDayOfTheWeek: 'Sunday',
  }

  const action = setSettings(settings)

  expect(action).toEqual({
    type: 'SET_SETTINGS',
    settings,
  })
})

test('should fetch the settings from database', async (done) => {
  const store = createMockStore(defaultAuthState)

  await store.dispatch(startSetSettings())

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_SETTINGS',
    settings: initialState,
  })

  done()
})
