const defaultState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 20,
  rounds: 4,
  showTimerInTitle: true,
  showNotifications: true,
}

const initialState = {
  workDuration: null,
  shortBreakDuration: null,
  longBreakDuration: null,
  rounds: null,
  showTimerInTitle: null,
  showNotifications: null,
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
    case 'SET_SHOW_TIMER_IN_TITLE':
      return {
        ...state,
        showTimerInTitle: action.showTimerInTitle,
      }
    case 'SET_SHOW_NOTIFICATIONS':
      return {
        ...state,
        showNotifications: action.showNotifications,
      }
    case 'SET_SETTINGS':
      return {
        ...defaultState,
        ...action.settings,
      }

    default:
      return state
  }
}
