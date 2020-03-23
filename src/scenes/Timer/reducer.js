const ROUNDS_NUMBER = 4

export const STATUSES = {
  onHold: 'ON_HOLD',
  running: 'RUNNING',
  paused: 'PAUSED',
}

export const TYPES = {
  work: { id: 'WORK', duration: 25 },
  shortBreak: { id: 'SHORT_BREAK', duration: 5 },
  longBreak: { id: 'LONG_BREAK', duration: 20 },
}

export const setTitle = (type, timeLeft) => {
  let emoji

  if (type === TYPES.work.id) {
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

const initialState = {
  status: STATUSES.onHold,
  type: TYPES.work.id,
  progress: 100,
  timeLeft: { minutes: TYPES.work.duration, seconds: 0 },
  duration: TYPES.work.duration,
  currentRound: 1,
  interval: null,
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

      return {
        ...state,
        status: STATUSES.onHold,
        interval: null,
        timeLeft: { minutes: state.duration, seconds: 0 },
        progress: 100,
      }
    case 'SET_NEXT_TIMER':
      clearInterval(state.interval)

      let newType,
        newTimeLeft,
        newDuration,
        newCurrentRound = state.currentRound

      if (state.currentRound < ROUNDS_NUMBER) {
        if (state.type === TYPES.work.id) {
          const { id, duration } = TYPES.shortBreak

          newType = id
          newTimeLeft = { minutes: duration, seconds: 0 }
          newDuration = duration
        } else {
          const { id, duration } = TYPES.work

          newType = id
          newTimeLeft = { minutes: duration, seconds: 0 }
          newDuration = duration
          newCurrentRound = state.currentRound + 1
        }
      } else {
        if (state.type === TYPES.work.id) {
          const { id, duration } = TYPES.longBreak

          newType = id
          newTimeLeft = { minutes: duration, seconds: 0 }
          newDuration = duration
        } else {
          const { id, duration } = TYPES.work

          newType = id
          newTimeLeft = { minutes: duration, seconds: 0 }
          newDuration = duration
          newCurrentRound = 1
        }
      }

      return {
        ...state,
        status: STATUSES.onHold,
        progress: 100,
        interval: null,
        type: newType,
        timeLeft: newTimeLeft,
        duration: newDuration,
        currentRound: newCurrentRound,
      }
    default:
      return state
  }
}
