export const initialState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 20,
  rounds: 4,
  showTimerInTitle: true,
  showNotifications: true,
  darkMode: false,
  autostart: false,
  firstDayOfTheWeek: 'Monday',
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
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.darkMode,
      }
    case 'SET_AUTOSTART':
      return {
        ...state,
        autostart: action.autostart,
      }
    case 'SET_FIRST_DAY_OF_THE_WEEK':
      return {
        ...state,
        firstDayOfTheWeek: action.firstDayOfTheWeek,
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
