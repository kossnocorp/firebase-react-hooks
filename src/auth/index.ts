import firebase from 'firebase/app'
import 'firebase/auth'
import {
  AuthEmailOptions,
  AuthOptions,
  AuthProvider,
  firebaseSendSignInLink,
  firebaseSignIn,
  firebaseSignInWithLink,
  firebaseSignOut
} from '../_lib/auth'

export function signIn(provider: AuthProvider, options?: AuthOptions) {
  const doSignIn = () =>
    firebaseSignIn(firebase.auth(), firebase.auth, provider, options)

  if (options?.persistance)
    return firebase
      .auth()
      .setPersistence(options?.persistance)
      .then<any>(doSignIn)
  else return doSignIn()
}

export function sendSignInLink(options: AuthEmailOptions) {
  return firebaseSendSignInLink(firebase.auth(), options)
}

export function signInWithLink(options: AuthEmailOptions) {
  return firebaseSignInWithLink(firebase.auth(), options)
}

export function signOut() {
  return firebaseSignOut(firebase.auth())
}
