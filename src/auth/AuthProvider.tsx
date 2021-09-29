import firebase from 'firebase/compat'
import { FC, createContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebase'

type AuthContentProps = {
  currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContentProps>({ currentUser: undefined })

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] =
    useState<firebase.User | null | undefined>(null)
  const [token, setToken] = useState<string>()

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setCurrentUser(user)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
