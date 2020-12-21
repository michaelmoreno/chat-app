import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  
  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordCheck, displayName };
    await Axios.post('http://localhost:3000/users/register', newUser)

    const loginRes = await Axios.post('http://localhost:3000/users/login', {
      email,
      password
    })
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    });
    localStorage.setItem('auth-token', loginRes.data.token) //can I just do token instead?
    history.push('/');
  }
  
  return (
    <div id="register">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input type="email" id="register-email" onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="register-password">Password</label>
        <input type="text" id="register-password" onChange={e => setPassword(e.target.value)}/>
        <input type="text" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
        
        <label htmlFor="register-display-name">Display Name</label>
        <input type="display-name" id="register-display-name" onChange={e => setDisplayName(e.target.value)}/>

        <input type="submit" value="Register"/>
      </form>
    </div>
  ) 
}
