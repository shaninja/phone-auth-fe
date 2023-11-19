import React from 'react'
import firebase from 'firebase/compat/app'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  margin: 50px;
`

const LogoutButton: React.FC = () => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // TODO we might want to consider using react-router-dom
        window.location.pathname = '/'
      })
      .catch((error) => {
        console.log('Logout failed', error)
      })
  }

  return <StyledButton onClick={logout}>Logout</StyledButton>
}

export default LogoutButton
