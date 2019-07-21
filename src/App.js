import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionsContainer from "./containers/SessionsContainer";
import Session from "./components/Session";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Profile from "./containers/Profile";
import "./App.scss";

export default class App extends React.Component {
  state = {
    currentUser: {},
    users: [],
    userSessions: []
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: { Authorization: localStorage.token }
      })
        .then(res => res.json())
        .then(profileInfo => {
          this.getUser(profileInfo);
        });
    } else {
      console.log("nobody here");
    }
  }

  getUser = userData => {
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(usersData => {
        this.setState({ users: usersData.data }, () => {
          let thisUser;
          thisUser = this.state.users.find(
            user => user.attributes.username === userData.username
          );
          this.setState({
            currentUser: thisUser,
            userSessions: thisUser.attributes.sessions
          });
        });
      });
  };

  clearUser = () => {
    console.log("User gone");
    this.setState({
      currentUser: {},
      userSessions: []
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar currentUser={this.state.currentUser} />
          <Route
            path="/login"
            render={routerProps => (
              <Login {...routerProps} getUser={this.getUser} />
            )}
          />
          <Route
            path="/signup"
            render={routerProps => (
              <Signup {...routerProps} getUser={this.getUser} />
            )}
          />
          <Route
            path="/signout"
            render={routerProps => (
              <Signout {...routerProps} clearUser={this.clearUser} />
            )}
          />

          <Route
            path="/profile"
            render={routerProps => (
              <Profile {...routerProps} getUser={this.getUser} currentUser={this.state.currentUser} />
            )}
          />

          <div>
            <Route
              exact
              path="/"
              render={routerProps => (
                <SessionsContainer
                  {...routerProps}
                  userSessions={this.state.userSessions} 
                  currentUser={this.state.currentUser}
                />
              )}
            />

            {this.state.userSessions === 0 ? null : (
              <Route
                path={`/sessions/:sessionsId`}
                render={routerProps => <Session {...routerProps} />}
              />
            )}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
