import { setSessions, addSession } from '../actions'
import sessions from './fixtures/sessions'

test('should generate action object for setSessions', () => {
  const action = setSessions(sessions)

  expect(action).toEqual({
    type: 'SET_SESSIONS',
    sessions,
  })
})

test('should generate action object for addSession', () => {
  const action = addSession(sessions[0])

  expect(action).toEqual({
    type: 'ADD_SESSION',
    session: sessions[0],
  })
})
