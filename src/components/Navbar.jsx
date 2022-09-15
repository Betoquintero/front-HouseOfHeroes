import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='navBar'>
      {/* {user && <p>Hello {user.username}</p> } */}
      <ul>
        <li><NavLink  className= {(element) => element.isActive ? 'selected links ' : 'links'} to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected links' : 'links'} to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/profile">Profile</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
  )
}
