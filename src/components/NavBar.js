import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import NewSessionForm from "../components/NewSessionForm";


export class NavBar extends Component {
 state = {
   hiddenButton: false,
   hiddenForm: true
 }

 toggleHidden = (e) => {
  console.log('e: ', e);
  this.setState({
    hiddenForm: !this.state.hiddenForm,
    hiddenButton: !this.state.hiddenButton
  });
}

  render() {

    return (
      
    <div className="navbar">
      
      <NavLink to="/">Sessions</NavLink>
      {localStorage.token ? (<span
              onClick={this.toggleHidden.bind(this)}
              className={this.state.hiddenButton ? "hidden" : ""}
              role="img"
              aria-label="Piano"
            >🎹</span> ) : null }
  
      
     <div className="navuser"> {localStorage.token ? (<div><NavLink to="/profile">Profile</NavLink><NavLink to="/signout">Signout</NavLink>
   </div>) : (<div><NavLink to="/login">Login</NavLink>
   <NavLink to="/signup">Signup</NavLink></div>)}
   </div>
{!this.state.hiddenForm && <NewSessionForm toggleHidden={this.toggleHidden} currentUser={this.props.currentUser} />}
    </div>
  
    )
  }
}

export default NavBar
