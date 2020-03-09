const initialState = {
  signed: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        signed: true,
      }
    default:
      return state
  }
}
