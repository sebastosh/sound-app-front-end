import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { motion } from "framer-motion"
import SessionsContainer from "./containers/SessionsContainer";
import Session from "./components/Session";
// import SessionChat from "./components/SessionChat";
import NewSessionForm from "./components/NewSessionForm";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Profile from "./containers/Profile";
import Chats from "./containers/Chats";
import "./App.scss";

export default class App extends React.Component {
  state = {
    users: [],
    sessions: [],
    currentUser: {},
    currentUserSessions: []
 
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

  
    fetch("http://localhost:3000/sessions")
    .then(response => response.json())
    .then(sessionsData => {
      console.log('sessionsData: ', sessionsData);
      this.setState({ sessions: sessionsData.data })
    
    });
  

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
            currentUserSessions: thisUser.attributes.sessions
          });
        });
      });

      
  };

  clearUser = () => {
    console.clear();
    console.log("User gone");
    this.setState({
      currentUser: {},
      currentUserSessions: []
    });
  };

  addSession = session => {
    console.log("New session", session);
    this.setState({
      currentUserSessions: [...this.state.currentUserSessions, session]
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar routerprops={this.routerProps} appState={this.state} addSession={this.addSession} getUser={this.getUser} sessionUser={this.state.currentUser}/>
          
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
              <Profile
                {...routerProps}
                getUser={this.getUser}
                currentUser={this.state.currentUser}
              />
            )}
          />

          <Route
            path="/new-session"
            render={routerProps => (
              <NewSessionForm
                {...routerProps}
                sessionUser={this.state.currentUser}
                addSession={this.addSession}
              />
            )}
          />

          <div>
            <Route
              exact
              path="/"
              render={routerProps => (
                <SessionsContainer
                  {...routerProps}
                  currentUserSessions={this.state.currentUserSessions}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            
             <Route
            path="/chats"
            render={routerProps => (
              <Chats {...routerProps} currentUser={this.state.currentUser} />
            )}
          />

            {this.state.currentUserSessions === 0 ? null : (
              <Route
                path={`/sessions/:sessionsId`}
                currentUser={this.state.currentUser}
                render={routerProps => <Session {...routerProps} currentUser={this.state.currentUser}/>}
              />
            )}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
