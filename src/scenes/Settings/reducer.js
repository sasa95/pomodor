const initialState = {
  rounds: 4,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROUNDS':
      return {
        rounds: action.roundsNumber,
      }
    default:
      return state
  }
}
