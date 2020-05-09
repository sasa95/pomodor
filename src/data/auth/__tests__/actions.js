import { setUserInfo, signOut } from '../actions'

test('should generate action object for setUserInfo', () => {
  const userInfo = {
    uid: 'asd123',
    creationTime: new Date('05/05/2020'),
  }
  const action = setUserInfo(userInfo)

  expect(action).toEqual({
    type: 'SET_USER_INFO',
    userInfo,
  })
})

test('should generate action object for signOut', () => {
  const action = signOut()

  expect(action).toEqual({
    type: 'SIGN_OUT',
  })
})
