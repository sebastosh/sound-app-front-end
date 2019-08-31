import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";
import NewSessionForm from "./NewSessionForm";

export class NavBar extends Component {
  state = {
    newClick: false,
    help: false
  };

  resetState = () => {
    this.setState({ newClick: false });
  };
  newSessionClick = () => {
    this.setState({ newClick: !this.state.newClick });
  };

  showHelp = e => {
    this.setState({ help: !this.state.help });
  };

  render() {
    return (
      <div className="navbar">
        <NavLink to="/">
          <span role="img" aria-label="sessions">
            Synth Sessions 🎛
          </span>
        </NavLink>
        {localStorage.token && !this.state.newClick ? (
          <span
            className="newButton"
            onClick={this.newSessionClick}
            role="img"
            aria-label="new session"
          >
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

        {localStorage.token ? (
          <div className="navuser">
            {this.state.help ? (
              <div className="key-ui">
                <h3>Keyboard Note Map:</h3>
                <img
                  onClick={this.showHelp}
                  src="/Piano.png"
                  alt="piano keyboard mapping"
                />
              </div>
            ) : null}
            <span
              onClick={this.showHelp}
              className="help-button"
              role="img"
              aria-label="chat"
            >
              ？
            </span>
            <div className="nav-item">
              <NavLink onClick={this.resetState} to="/profile">
                <span role="img" aria-label="profile">
                  👤
                </span>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink onClick={this.resetState} to="/signout">
                  Sign Out
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="navuser">
            <div className="nav-item">
             
              <NavLink onClick={this.resetState} to="/login">
                Log In
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink onClick={this.resetState} to="/signup">
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(NavBar);
