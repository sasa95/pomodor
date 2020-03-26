const initialState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 20,
  rounds: 4,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WORK_DURATION':
      return {
        ...state,
        workDuration: action.duration,
      }
    case 'SET_SHORT_BREAK_DURATION':
      return {
        ...state,
        shortBreakDuration: action.duration,
      }
    case 'SET_LONG_BREAK_DURATION':
      return {
        ...state,
        longBreakDuration: action.duration,
      }
    case 'SET_ROUNDS':
      return {
        ...state,
        rounds: action.rounds,
      }
    case 'SET_SETTINGS':
      return {
        ...state,
        ...action.settings,
      }
    default:
      return state
  }
}
