export const setStatus = status => ({
  type: 'SET_STATUS',
  status,
})

export const setProgress = progress => ({
  type: 'SET_PROGRESS',
  progress,
})

export const setTimeLeft = timeLeft => ({
  type: 'SET_TIME_LEFT',
  timeLeft,
})

export const saveInterval = interval => ({
  type: 'SAVE_INTERVAL',
  interval,
})

export const pauseTimer = () => ({
  type: 'PAUSE_TIMER',
})

export const resetTimer = () => ({
  type: 'RESET_TIMER',
})

export const setNextTimer = () => ({
  type: 'SET_NEXT_TIMER',
})
