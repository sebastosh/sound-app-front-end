import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import NewSessionForm from "./NewSessionForm";

export class NavBar extends Component {
  state = {
    newClick: false,
    sessionName: '',
    user_id: '',
    instrument_id:'',
    currentUser: {},
    instruments: []
}

  newSessionClick = e => {
    this.setState({ newClick: !this.state.newClick })

  }

  componentDidMount(){
    fetch("http://localhost:3000/instruments")
    .then(response => response.json())
    .then(instrumentData => {
      this.setState(
        { instruments: instrumentData.data },
      );
      
     })
    }

    componentWillReceiveProps(props) {
      console.log('props: ', props);

      // if (props.synthApi.settings === null) { console.log('no settings');} else
      // {this.setState({ name: props.synthApi.name,
      // settings: props.synthApi.settings });}
    
  }


  render() {


    return (
      
    <div className="navbar">
      
      <NavLink to="/"><span role="img" aria-label="control knobs">🎛</span></NavLink>{localStorage.token && !this.state.newClick ? <span className="newButton" onClick={this.newSessionClick} >🎹</span> : null}
      
      {this.state.newClick ? <NewSessionForm sessionUser={this.props.sessionUser} addSession={this.props.addSession}newClick={this.newSessionClick}/> : null}

        
     <div className="navuser"> {localStorage.token ? (<div><NavLink to="/chats"><span role="img" aria-label="chat">💬</span></NavLink><NavLink to="/profile"><span role="img" aria-label="profile">⏀</span></NavLink><NavLink to="/signout"><span role="img" aria-label="Sign In">⏄</span></NavLink>
   </div>) : (<div><NavLink to="/login"><span role="img" aria-label="Login">⏀</span></NavLink>
   <NavLink to="/signup"><span role="img" aria-label="Sign Up">⏅</span></NavLink></div>)}
   </div>

    </div>
                
  
    )
  }
}

export default NavBar
