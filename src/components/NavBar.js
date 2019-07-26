import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink, withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import NewSessionForm from "./NewSessionForm";
import Session from "./Session";


export class NavBar extends Component {
  state = {
    newClick: false,
    help: false
  };

  newSessionClick = () => {
    this.setState({ newClick: !this.state.newClick });
  };

  showHelp = (e) => {
    console.log('e: ', e);
    this.setState({ help: !this.state.help });
  };

  render() {
    return (
      <div className="navbar">
        <NavLink to="/">
          <span role="img" aria-label="control knobs">
            🎛
          </span>
        </NavLink>
        {localStorage.token ? (    
              <NavLink to="/chats">
                <span role="img" aria-label="chat">
                  💬
                </span>
              </NavLink>): null}
        {localStorage.token && !this.state.newClick ? (
          <span className="newButton" onClick={this.newSessionClick}>
            🎹
          </span>
        ) : null}

        {this.state.newClick ? (
          <NewSessionForm
            {...this.props}
            sessionUser={this.props.sessionUser}
            addSession={this.props.addSession}
            newClick={this.newSessionClick}
          />
        ) : null}

        <div className="navuser">
         
          {localStorage.token ? (
            <div>
              <Popup trigger={<span className="help-button" role="img" aria-label="Help">
                  ？
                </span>} position="bottom right">
    <img className="key-ui" src="/Piano.png" />
    
  </Popup>
              
              <NavLink to="/profile">
                <span role="img" aria-label="profile">
                  ⏀
                </span>
              </NavLink>
              <NavLink to="/signout">
                <span role="img" aria-label="Sign In">
                  ⏄
                </span>
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink onClick={this.newSessionClick} to="/login">
                <span role="img" aria-label="Login">
                  ⏀
                </span>
              </NavLink>
              <NavLink to="/signup">
                <span role="img" aria-label="Sign Up">
                  ⏅
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
