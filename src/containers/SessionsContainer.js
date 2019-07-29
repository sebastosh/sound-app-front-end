import { Link } from "react-router-dom";
import React, { Component } from "react";


export class SessionsContainer extends Component {

  render() {

    const userSessions = this.props.userSessions;
    console.log('userSessions: ', userSessions);
    
    let renderSessions = userSessions.map(session => {
      return (
        <div className="card" key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.id}-{session.session_id}</Link>
        

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
