import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  setSessions,
  addSession,
  startSetSessions,
  startAddSession,
} from '../actions'
import sessions from './mock-data/sessions'
import fs from '../../../firebase/firebase'

const uid = 'asdf1234'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

jest.setTimeout(15000)

beforeEach(async (done) => {
  const batch = fs.batch()

  const sessionsRef = await fs.collection(`users/${uid}/sessions`).get()

  sessionsRef.docs.forEach(({ id }) => {
    batch.delete(fs.doc(`users/${uid}/sessions/${id}`))
  })

  sessions.forEach(({ id, label, duration, createdAt }) => {
    const ref = fs.collection(`users/${uid}/sessions`).doc(id)
    batch.set(ref, { label, duration, createdAt })
  })

  await batch.commit()
  done()
})

test('should generate action object for setSessions', () => {
  const action = setSessions(sessions)

  expect(action).toEqual({
    type: 'SET_SESSIONS',
    sessions,
  })
})

test('should fetch the sessions from database', async (done) => {
  const store = createMockStore(defaultAuthState)

  await store.dispatch(startSetSessions())

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_SESSIONS',
    sessions,
  })

  done()
})

test('should generate action object for addSession', () => {
  const action = addSession(sessions[0])

  expect(action).toEqual({
    type: 'ADD_SESSION',
    session: sessions[0],
  })
})

test('should add a session to store and database', async (done) => {
  const store = createMockStore(defaultAuthState)

  await store.dispatch(startAddSession(sessions[0]))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'ADD_SESSION',
    session: sessions[0],
  })

  done()
})
