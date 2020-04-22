const initialState = true

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROGRESS_VISIBILITY':
      return action.visibility
    default:
      return state
  }
}
