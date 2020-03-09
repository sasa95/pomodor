const initialState = {
  totalSessions: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_TOTAL_SESSIONS':
      return {
        totalSessions: ++state.totalSessions,
      }
    default:
      return state
  }
}
