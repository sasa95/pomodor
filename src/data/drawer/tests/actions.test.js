import { setDrawerOpened } from '../actions'

test('should generate action object for setDrawerOpened', () => {
  const opened = true
  const action = setDrawerOpened(opened)

  expect(action).toEqual({
    type: 'SET_DRAWER_OPENED',
    opened,
  })
})
