const initialState = false

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRAWER_OPENED':
      return action.opened
    default:
      return state
  }
}
