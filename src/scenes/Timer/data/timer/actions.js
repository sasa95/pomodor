export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status,
})

export const setProgress = (progress) => ({
  type: 'SET_PROGRESS',
  progress,
})

export const setTimeLeft = (timeLeft) => ({
  type: 'SET_TIME_LEFT',
  timeLeft,
})

export const saveInterval = (interval) => ({
  type: 'SAVE_INTERVAL',
  interval,
})

export const pauseTimer = () => ({
  type: 'PAUSE_TIMER',
})

export const resetTimer = ({ duration, showTimerInTitle }) => ({
  type: 'RESET_TIMER',
  duration,
  showTimerInTitle,
})

export const setNextTimer = (settings) => ({
  type: 'SET_NEXT_TIMER',
  settings,
})

export const setSaveSessionAlert = (saveSessionAlert) => ({
  type: 'SET_SAVE_SESSION_ALERT',
  saveSessionAlert,
})
