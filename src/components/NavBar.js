import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export class NavBar extends Component {

  render() {

    return (
      
    <div className="navbar">
      
      <NavLink to="/">Sessions</NavLink>
      <NavLink to="/new-session">🎹</NavLink>
        
     <div className="navuser"> {localStorage.token ? (<div><NavLink to="/profile">Profile</NavLink><NavLink to="/signout">Signout</NavLink>
   </div>) : (<div><NavLink to="/login">Login</NavLink>
   <NavLink to="/signup">Signup</NavLink></div>)}
   </div>
    </div>
                
  
    )
  }
}

export default NavBar
