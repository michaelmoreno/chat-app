import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const loginUser = { email, password };
    const loginRes = await Axios.post('http://localhost:3000/users/login', loginUser)
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    });
    localStorage.setItem('auth-token', loginRes.data.token) //can I just do token instead?
    history.push('/');
  }

  
  return (
    <div id="login">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input type="email" id="register-email" onChange={e => setEmail(e.target.value)} />

        <label htmlFor="login-password">Password</label>
        <input type="text" id="login-password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form>
    </div>
  )
}
