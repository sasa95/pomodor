const initialState = []

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SESSIONS':
      return [...action.sessions]
    case 'ADD_SESSION':
      return [...state, action.session]
    default:
      return state
  }
}
