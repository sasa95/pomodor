import fs from '../../firebase/firebase'

export const setSessions = (sessions) => ({
  type: 'SET_SESSIONS',
  sessions,
})

export const startSetSessions = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    const sessionsRef = await fs.collection(`users/${uid}/sessions`).get()

    const sessions = sessionsRef.docs.map((session) => ({
      id: session.id,
      ...session.data(),
    }))

    dispatch(setSessions(sessions))

    return sessionsRef
  }
}

export const addSession = (session) => ({
  type: 'ADD_SESSION',
  session,
})

export const startAddSession = (session) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    const ref = await fs.collection(`users/${uid}/sessions`).add(session)

    dispatch(addSession(session))

    return ref
  }
}
