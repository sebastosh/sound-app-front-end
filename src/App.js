import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionsContainer from "./containers/SessionsContainer";
import SessionShow from "./components/SessionShow";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Profile from "./containers/Profile";

export default class App extends React.Component {
  state = {
    currentUser: {},
    users: [],
    currentSessions: []
  };

  componentDidMount() {
    console.log("componentDidMount: ");
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(usersData => {
        this.setState({
          users: usersData
        });
      });
    if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: { Authorization: localStorage.token }
      })
        .then(res => res.json())
        .then(profileInfo => {
          this.setState({ currentUser: profileInfo });
          this.getUser(profileInfo);
        });
    }
  }
  componentDidUpdate() {
    console.log("componentDidUpdate:", this.props.currentUser);
  }

  getUser = userData => {
    let thisUser;
    thisUser = this.state.users.data.find(
      user => user.attributes.username === userData.username
    );
    this.setState({ 
      currentUser: thisUser,
      currentSessions: thisUser.attributes.sessions
     });
  };

  clearUser = () => {
    console.log("User gone");
    this.setState({ 
      currentUser: {},
      currentSessions: []
     });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
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
              <Profile {...routerProps} currentUser={this.state.currentUser} />
            )}
          />
          <div>
            {!this.state.currentSessions ? (
              <div>NO SESSIONS</div>
            ) : (
              <Route
                exact
                path="/"
                render={routerProps => (
                  <SessionsContainer
                    {...routerProps}
                    currentSessions={this.state.currentSessions}
                  />
                )}
              />
            )}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
