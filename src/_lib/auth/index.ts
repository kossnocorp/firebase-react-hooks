import type firebase from 'firebase/app'

export type AuthUser = null | undefined | firebase.User

export type AuthNamespace = typeof firebase.auth

export type AuthInstance = AuthNamespace extends () => infer Instance
  ? Instance
  : never

export type AuthProvider = 'twitter' | 'google' | 'github'

export type AuthOptions = {
  redirect?: boolean
  persistance?: firebase.auth.Auth.Persistence
}

export type AuthEmailOptions = {
  email: string
  url: string
}

export function firebaseSignIn(
  instance: AuthInstance,
  namespace: AuthNamespace,
  provider: AuthProvider,
  options?: AuthOptions
) {
  if (options?.redirect) {
    return instance.signInWithRedirect(getProvider(namespace, provider))
  } else {
    return instance.signInWithPopup(getProvider(namespace, provider))
  }
}

export function firebaseSendSignInLink(
  instance: AuthInstance,
  options: AuthEmailOptions
) {
  return instance.sendSignInLinkToEmail(options.email, {
    url: options.url,
    handleCodeInApp: true
  })
}

export function firebaseSignInWithLink(
  instance: AuthInstance,
  options: AuthEmailOptions
) {
  return instance.signInWithEmailLink(options.email, options.url)
}

export function firebaseSignOut(auth: AuthInstance) {
  return auth.signOut()
}

function getProvider(auth: AuthNamespace, provider: AuthProvider) {
  switch (provider) {
    case 'twitter':
      return new auth.TwitterAuthProvider()

    case 'google':
      return new auth.GoogleAuthProvider()

    case 'github':
      return new auth.GithubAuthProvider()
  }
}
