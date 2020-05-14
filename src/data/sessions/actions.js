import fs from '../../firebase/firebase'

export const setSessions = (sessions) => ({
  type: 'SET_SESSIONS',
  sessions,
})

export const startSetSessions = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    try {
      const sessionsRef = await fs.collection(`users/${uid}/sessions`).get()

      const sessions = sessionsRef.docs.map((session) => ({
        id: session.id,
        ...session.data(),
      }))

      dispatch(setSessions(sessions))
      return sessionsRef
    } catch (e) {
      dispatch(setSessions([]))
    }
  }
}

export const addSession = (session) => ({
  type: 'ADD_SESSION',
  session,
})

export const startAddSession = (session) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid
    const { duration, label = null, createdAt } = session

    const newSessionRef = fs.collection(`users/${uid}/sessions`).doc()

    dispatch(
      addSession({
        id: newSessionRef.id,
        ...session,
      })
    )

    await newSessionRef.set({
      duration,
      label,
      createdAt,
    })

    return newSessionRef
  }
}
