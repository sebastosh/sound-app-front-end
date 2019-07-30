import { Link } from "react-router-dom";
import React, { Component } from "react";


export class SessionsContainer extends Component {
  state = {
    sessions: []
  }

  render() {

    const userSessions = this.props.currentUserSessions;
    console.log('userSessions: ', userSessions);
    
    let renderSessions = userSessions.map(usersession => {
      return (
        <div className="card" key={usersession.id}>
          <Link to={`/sessions/${usersession.id}`}>{usersession.name}</Link> 
      </div>
      );
    });
  
    return (
      <div>
        {renderSessions}
      </div>
    );
  }
}

export default SessionsContainer;
