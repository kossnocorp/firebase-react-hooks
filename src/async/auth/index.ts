import {
  AuthEmailOptions,
  AuthOptions,
  AuthProvider,
  firebaseSendSignInLink,
  firebaseSignIn,
  firebaseSignInWithLink
} from '../../_lib/auth'
import { ensureApp } from 'lazyfire'

export async function signIn(provider: AuthProvider, options?: AuthOptions) {
  const { firebase } = await ensureApp()
  await import('firebase/auth')

  if (options?.persistance)
    await firebase.auth().setPersistence(options?.persistance)

  return firebaseSignIn(firebase.auth(), firebase.auth, provider, options)
}

export async function sendSignInLink(options: AuthEmailOptions) {
  const { firebase } = await ensureApp()
  await import('firebase/auth')
  return firebaseSendSignInLink(firebase.auth(), options)
}

export async function signInWithLink(options: AuthEmailOptions) {
  const { firebase } = await ensureApp()
  await import('firebase/auth')
  return firebaseSignInWithLink(firebase.auth(), options)
}

export async function signOut() {
  const { firebase } = await ensureApp()
  await import('firebase/auth')
  return firebase.auth().signOut()
}
