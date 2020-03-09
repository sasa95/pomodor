const initialState = {
  timerActive: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMER_ACTIVE':
      return {
        timerActive: action.timerActive,
      }
    default:
      return state
  }
}
