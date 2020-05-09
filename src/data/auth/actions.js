import { firebase } from '../../firebase/firebase'

export const setUserInfo = (userInfo) => ({
  type: 'SET_USER_INFO',
  userInfo,
})

export const linkAccount = (authProvider) => {
  return async (dispatch) => {
    try {
      const res = await firebase.auth().currentUser.linkWithPopup(authProvider)

      const user = res.user

      const userInfo = { uid: user.uid }

      userInfo.creationTime = user.metadata.creationTime

      if (user.providerData && user.providerData.length) {
        userInfo.name = user.providerData[0].displayName
        userInfo.photo = user.providerData[0].photoURL
      }

      dispatch(setUserInfo(userInfo))
      return res
    } catch (e) {
      if (e.code === 'auth/credential-already-in-use') {
        return firebase.auth().signInWithCredential(e.credential)
      }
    }
  }
}

export const signOut = () => ({
  type: 'SIGN_OUT',
})

export const startSignOut = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
    dispatch(signOut())
  }
}
