import { Link } from "react-router-dom";
import React, { Component } from "react";

export class SessionsContainer extends Component {

  render() {
    const userSessions = this.props.userSessions;
    let renderSessions = userSessions.map(session => {
      return (
        <div className="card" key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </div>
      );
    });

    return (
      <div>
        {renderSessions}
        <div className="card">
        {localStorage.token ? <Link to="/new-session"><span role="img" aria-label="Piano">🎹</span></Link> : <Link to="/login"><span role="img" aria-label="Piano">🎹</span></Link>}
        </div>
      </div>
    );
  }
}

export default SessionsContainer;
