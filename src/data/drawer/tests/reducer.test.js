import { reducer } from '../reducer'

test('should setup default drawer state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(false)
})

test('should set drawer visibility', () => {
  const state = reducer(true, {
    type: 'SET_DRAWER_OPENED',
    opened: false,
  })

  expect(state).toEqual(false)
})
