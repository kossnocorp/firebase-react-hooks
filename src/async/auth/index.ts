import { AuthProvider, AuthOptions, firebaseSignIn } from '../../_lib/auth'

export async function signIn(provider: AuthProvider, options?: AuthOptions) {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebaseSignIn(firebase.auth(), firebase.auth, provider, options)
}

export async function signOut() {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  return firebase.auth().signOut()
}
