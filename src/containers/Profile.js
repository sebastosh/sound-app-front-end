import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  state = {
    currentUser: {},
    users: [],
    userSessions: []
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("https://still-mountain-88882.herokuapp.com/profile", {
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
    fetch("https://still-mountain-88882.herokuapp.com/users")
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

  render() {
    let sessions;
    if (!!this.state.currentUser.attributes) {
      sessions = this.state.currentUser.attributes.sessions.map(session => {
        return (
          <div className="card" key={session.id}>
            <Link to={`/sessions/${session.id}`}>{session.name}</Link>
          </div>
        );
      });
    }

    return (
      <div className="profile">
        {!!this.state.currentUser.attributes ? (
          <h1>{this.state.currentUser.attributes.username}'s Sessions</h1>
        ) : (
          <h1>One Sec</h1>
        )}
        {sessions}
      </div>
    );
  }
}

export default Profile;
