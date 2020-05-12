export const initialState = {
  uid: null,
  name: null,
  photo: null,
  creationTime: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...action.userInfo,
      }

    case 'SIGN_OUT':
      return {
        ...initialState,
      }
    default:
      return state
  }
}
