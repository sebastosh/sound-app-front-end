import { Link } from 'react-router-dom';
import Session from '../components/Session'

import React, { Component } from 'react'

export class SessionsContainer extends Component {
  render() { 
    console.log(this.props);
    const userSessions = this.props.currentSessions
    let sessions = userSessions.map(session => {
      return <Session key={session.id} session={session} />;
    });
    return (
      <div>
        {sessions}
        {/* {this.state.currentUser.id === 2 ? <div>NO SESSIONS</div> : (
              <Route
                path={`/sessions/:sessionsId`}
                render={routerProps => (
                  <SessionShow
                    {...routerProps}
                    sessions={this.state.sessions}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
            )} */}
            
      </div>
    );
  
  }
}

export default SessionsContainer
