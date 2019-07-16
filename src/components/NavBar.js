import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Sessions</NavLink>
      
     <div className="navuser"> {localStorage.token ? (<div><NavLink to="/profile">Profile</NavLink><NavLink to="/signout">Signout</NavLink>
   </div>) : (<div><NavLink to="/login">Login</NavLink>
   <NavLink to="/signup">Signup</NavLink></div>)}
   </div>
   
   </div>
  );
};

export default NavBar;