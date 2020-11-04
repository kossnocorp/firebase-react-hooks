import {
  AuthEmailOptions,
  AuthOptions,
  AuthProvider,
  firebaseSendSignInLink,
  firebaseSignIn,
  firebaseSignInWithLink
} from '../../_lib/auth'

export async function signIn(provider: AuthProvider, options?: AuthOptions) {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebaseSignIn(firebase.auth(), firebase.auth, provider, options)
}

export async function sendSignInLink(options: AuthEmailOptions) {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebaseSendSignInLink(firebase.auth(), options)
}

export async function signInWithLinK(options: AuthEmailOptions) {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebaseSignInWithLink(firebase.auth(), options)
}

export async function signOut() {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebase.auth().signOut()
}
