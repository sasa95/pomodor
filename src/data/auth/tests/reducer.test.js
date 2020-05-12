import { reducer, initialState } from '../reducer'

test('should setup default auth state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(initialState)
})

test('should set user info', () => {
  const currentState = { ...initialState }
  const userInfo = {
    uid: 'asd123',
    creationTime: new Date('05/05/2020'),
  }
  const state = reducer(currentState, {
    type: 'SET_USER_INFO',
    userInfo,
  })

  expect(state).toMatchObject(userInfo)
})

test('should reset user info on sign out', () => {
  const currentState = {
    ...initialState,
    uid: 'asd123',
    creationTime: new Date('05/05/2020'),
  }

  const state = reducer(currentState, {
    type: 'SIGN_OUT',
  })

  expect(state).toEqual(initialState)
})
