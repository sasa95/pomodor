import { setProgressVisibility } from '../actions'

test('should generate action object for setProgressVisibility', () => {
  const visibility = true
  const action = setProgressVisibility(visibility)

  expect(action).toEqual({
    type: 'SET_PROGRESS_VISIBILITY',
    visibility,
  })
})
