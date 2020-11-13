import React, { createContext, useContext, useEffect, useState } from "react"
import {
  registerAction,
  getUserAction,
  logoutAction,
  loginAction,
} from "./actions/AuthActions"
import { AlertContext } from "./AlertContext"
import { LoadingContext } from "./LoadingContext"

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const { addAlert } = useContext(AlertContext)
  const { setMainLoading } = useContext(LoadingContext)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  function registerUser(user) {
    registerAction(user, setToken, addAlert, setMainLoading)
  }
  function loginUser(user) {
    loginAction(user, setToken, addAlert, setMainLoading)
  }
  function fetchUser() {
    getUserAction(token, setToken, setUser, addAlert, setMainLoading)
  }
  function logoutUser() {
    logoutAction(setToken, setUser, addAlert, setMainLoading)
  }
  useEffect(
    () => {
      token && fetchUser()
    },
    /*eslint-disable*/ [token]
  )
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loginUser,
        logoutUser,
        registerUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
