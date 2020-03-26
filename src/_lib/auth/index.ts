export type AuthUser = null | undefined | import('firebase').User

export type AuthNamespace = typeof import('firebase').auth

export type AuthInstance = AuthNamespace extends () => infer Instance
  ? Instance
  : never

export type AuthProvider = 'twitter' | 'google' | 'github'

export type AuthOptions = {
  redirect?: boolean
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
