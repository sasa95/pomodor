import { reducer } from '../reducer'

test('should setup default progress state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(true)
})

test('should set progress visibility', () => {
  const state = reducer(true, {
    type: 'SET_PROGRESS_VISIBILITY',
    visibility: false,
  })

  expect(state).toEqual(false)
})
