import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>  
      <div className="item item-3">
      <h2>Sign up</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label>Username</label>
        <input className='formBox' required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Email</label>
        <input className='formBox' required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input className='formBox' required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input className='formBox' required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button className='genericButton' type="submit">Register</button>
      </form>
      </div>
      <div className="item item-4 gridMarvel"></div> 
    </div>
  )
}
