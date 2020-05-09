import { setSessions, addSession } from '../actions'

const sessions = [
  {
    id: '1',
    label: 'Study',
    duration: { seconds: 0, minutes: 25 },
    createdAt: 1586815200000,
  },
  {
    id: '2',
    label: 'Play the guitar',
    duration: { seconds: 0, minutes: 25 },
    createdAt: 1586901600000,
  },
  {
    id: '3',
    label: 'Clean the room',
    duration: { seconds: 0, minutes: 25 },
    createdAt: 1585778400000,
  },
]

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
