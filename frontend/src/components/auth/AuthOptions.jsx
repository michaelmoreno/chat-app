import React from 'react'
import { useHistory } from 'react-router-dom';

export default function AuthOptions() {
  const history = useHistory()
  
  return (
    <nav id="auth-options">
      <button onClick={() => history.push('/register')}>Register</button>
      <button onClick={() => history.push('/login')}>Login</button>
    </nav>
  )
}
