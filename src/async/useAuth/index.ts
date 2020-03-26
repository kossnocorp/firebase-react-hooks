import { useEffect, useState } from '../../adaptor'
import { firebaseOnAuthStateChanged } from '../../_lib/useAuth'
import { AuthUser } from '../../_lib/auth'

export default function useAuth() {
  const [user, setUser] = useState<AuthUser>()
  useEffect(() => {
    Promise.all([import('firebase/app'), import('firebase/auth')]).then(
      ([firebase]) => {
        firebaseOnAuthStateChanged(firebase.auth(), setUser)
      }
    )
  }, [])
  return user
}
