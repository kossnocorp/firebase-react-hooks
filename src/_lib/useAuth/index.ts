import { AuthInstance, AuthUser } from '../auth'

export function firebaseOnAuthStateChanged(
  auth: AuthInstance,
  setUser: (user: AuthUser) => void
) {
  auth.onAuthStateChanged(userData => {
    if (userData) {
      setUser(userData)
    } else {
      setUser(null)
    }
  })
}
