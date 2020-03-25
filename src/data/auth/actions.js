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

      if (user.providerData && user.providerData.length) {
        userInfo.name = user.providerData[0].displayName
        userInfo.photo = user.providerData[0].photoURL
      }

      dispatch(setUserInfo(userInfo))
    } catch (e) {
      if (e.code === 'auth/credential-already-in-use') {
        await firebase.auth().signInWithCredential(e.credential)
      }
    }
  }
}
