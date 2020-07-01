import { createContext } from '../adaptor'
import { AuthUser } from '../_lib/auth'

const AuthContext = createContext<AuthUser>(undefined)
export default AuthContext
