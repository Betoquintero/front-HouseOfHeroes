import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='navBar'>
      <ul>
        <li><NavLink  className= {(element) => element.isActive ? 'selected navLinks ' : 'navLinks'} to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected navLinks' : 'navLinks'} to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected navLinks' : 'navLinks'} to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected navLinks' : 'navLinks'} to="/profile">Profile</NavLink></li>}
        {isLoggedIn && <li><button className='navButton' onClick={() => logOutUser()}>Log out</button></li>}
        <li><button className='navButton' onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
  )
}
