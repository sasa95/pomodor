import { reducer } from '../reducer'
import sessions from './mock-data/sessions'

test('should setup default sessions state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should set sessions', () => {
  const state = reducer([], { type: 'SET_SESSIONS', sessions })
  expect(state).toEqual(sessions)
})

test('should add session', () => {
  const session = sessions[0]
  const state = reducer([], { type: 'ADD_SESSION', session })
  expect(state).toEqual([session])
})
