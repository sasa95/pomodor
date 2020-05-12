export const STATUSES = {
  onHold: 'ON_HOLD',
  running: 'RUNNING',
  paused: 'PAUSED',
}

export const TYPES = {
  work: 'WORK',
  shortBreak: 'SHORT_BREAK',
  longBreak: 'LONG_BREAK',
}

export const initialState = {
  status: STATUSES.onHold,
  type: TYPES.work,
  progress: 100,
  timeLeft: null,
  currentRound: 1,
  interval: null,
  saveSessionAlert: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      }
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      }
    case 'SET_TIME_LEFT':
      const { minutes, seconds } = action.timeLeft

      return {
        ...state,
        timeLeft: {
          minutes: minutes,
          seconds: isNaN(seconds) ? 0 : seconds,
        },
      }

    case 'SAVE_INTERVAL':
      return {
        ...state,
        interval: action.interval,
      }
    case 'PAUSE_TIMER':
      clearInterval(state.interval)

      return {
        ...state,
        status: STATUSES.paused,
        interval: null,
      }
    case 'RESET_TIMER':
      clearInterval(state.interval)
      const timeLeft = { minutes: action.duration, seconds: 0 }

      if (action.showTimerInTitle) {
        setTitle(state.type, timeLeft)
      }

      return {
        ...state,
        status: STATUSES.onHold,
        interval: null,
        timeLeft,
        progress: 100,
      }
    case 'SET_NEXT_TIMER':
      clearInterval(state.interval)

      const {
        workDuration,
        shortBreakDuration,
        longBreakDuration,
        rounds,
        showTimerInTitle,
      } = action.settings

      let newType
      let newTimeLeft
      let newCurrentRound = state.currentRound

      if (state.currentRound < rounds) {
        if (state.type === TYPES.work) {
          newType = TYPES.shortBreak
          newTimeLeft = { minutes: shortBreakDuration, seconds: 0 }
        } else {
          newType = TYPES.work
          newTimeLeft = { minutes: workDuration, seconds: 0 }
          newCurrentRound = state.currentRound + 1
        }
      } else {
        if (state.type === TYPES.work) {
          newType = TYPES.longBreak
          newTimeLeft = { minutes: longBreakDuration, seconds: 0 }
        } else {
          newType = TYPES.work
          newTimeLeft = { minutes: workDuration, seconds: 0 }
          newCurrentRound = 1
        }
      }

      if (showTimerInTitle) {
        setTitle(newType, newTimeLeft)
      }

      return {
        ...state,
        status: STATUSES.onHold,
        progress: 100,
        interval: null,
        type: newType,
        timeLeft: newTimeLeft,
        currentRound: newCurrentRound,
      }

    case 'SET_SAVE_SESSION_ALERT':
      return {
        ...state,
        saveSessionAlert: action.saveSessionAlert,
      }
    default:
      return state
  }
}

export const setTitle = (type, timeLeft) => {
  let emoji

  if (type === TYPES.work) {
    emoji = '👨‍💻'
  } else {
    emoji = '☕️'
  }

  document.title = `${
    timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes
  }:${
    timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds
  } ${emoji} | Pomodor`
}
