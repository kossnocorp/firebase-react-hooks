import { useEffect, useState } from '../../adaptor'
import { firebaseOnAuthStateChanged } from '../../_lib/useAuth'
import { AuthUser } from '../../_lib/auth'
import { ensureApp } from 'lazyfire'

export default function useAuth() {
  const [user, setUser] = useState<AuthUser>(undefined)
  useEffect(() => {
    ensureApp().then(async ({ app }) => {
      await import('firebase/auth')
      firebaseOnAuthStateChanged(app.auth(), setUser)
    })
  }, [])
  return user
}
