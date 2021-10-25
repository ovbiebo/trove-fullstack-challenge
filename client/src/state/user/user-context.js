import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from "jwt-decode";
import {getAccessToken} from "../../data-sources/local_storage";

const userContext = createContext()

function useUser () {
  const context = useContext(userContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

function UserProvider ({ children }) {
  const token = getAccessToken();
  const {userId, email} = token ? jwtDecode(token) : {}

  const initialState = {
    id: userId,
    email: email,
  }

  const [user, setUser] = useState(initialState)

  return (
    <userContext.Provider value={[user, setUser]}>
      {children}
    </userContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { UserProvider, useUser }
