import * as firebase from 'firebase/app'
import 'firebase/auth'
import { useEffect, useState } from '../adaptor'
import { AuthUser } from '../_lib/auth'
import { firebaseOnAuthStateChanged } from '../_lib/useAuth'

export default function useAuth() {
  const [user, setUser] = useState<AuthUser>(undefined)
  useEffect(() => {
    firebaseOnAuthStateChanged(firebase.auth(), setUser)
  }, [])
  return user
}
