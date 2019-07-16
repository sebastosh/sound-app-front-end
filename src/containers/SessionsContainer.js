import { Link } from "react-router-dom";
import Session from "../components/Session";

import React, { Component } from "react";

export class SessionsContainer extends Component {
  render() {
    const userSessions = this.props.currentSessions;
    let renderSessions = userSessions.map(session => {
      return (
        <div className={`card`} key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </div>
      );
    });

    return (
      <div>
        {renderSessions}
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

export default SessionsContainer;
