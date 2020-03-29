import fs from '../../firebase/firebase'

export const setWorkDuration = (duration) => ({
  type: 'SET_WORK_DURATION',
  duration,
})

export const startSetWorkDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { workDuration: duration } }, { merge: true })

    dispatch(setWorkDuration(duration))
  }
}

export const setShortBreakDuration = (duration) => ({
  type: 'SET_SHORT_BREAK_DURATION',
  duration,
})

export const startSetShortBreakDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { shortBreakDuration: duration } }, { merge: true })

    dispatch(setShortBreakDuration(duration))
  }
}

export const setLongBreakDuration = (duration) => ({
  type: 'SET_LONG_BREAK_DURATION',
  duration,
})

export const startSetLongBreakDuration = (duration) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    await fs
      .doc(`users/${uid}`)
      .set({ settings: { longBreakDuration: duration } }, { merge: true })

    dispatch(setLongBreakDuration(duration))
  }
}

export const setRounds = (rounds) => ({
  type: 'SET_ROUNDS',
  rounds,
})

export const startSetRounds = (rounds) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    await fs.doc(`users/${uid}`).set({ settings: { rounds } }, { merge: true })

    dispatch(setRounds(rounds))
  }
}

export const setSettings = (settings) => ({
  type: 'SET_SETTINGS',
  settings,
})

export const startSetSettings = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    const docRef = await fs.doc(`users/${uid}`).get()
    let data

    if (docRef.exists) {
      data = docRef.data().settings
    }

    dispatch(setSettings(data))
  }
}
