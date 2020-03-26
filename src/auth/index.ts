import * as firebase from 'firebase/app'
import 'firebase/auth'
import {
  AuthProvider,
  AuthOptions,
  firebaseSignIn,
  firebaseSignOut
} from '../_lib/auth'

export function signIn(provider: AuthProvider, options?: AuthOptions) {
  return firebaseSignIn(firebase.auth(), firebase.auth, provider, options)
}

export function signOut() {
  return firebaseSignOut(firebase.auth())
}
