import React from "react";
import DosSynth from './DosSynth'
import BassSynth from './BassSynth'
const API = "http://localhost:3000";

class Session extends React.Component {
  state = {    
    name: '',
    currentUser: {},
    user_id: '',
    instrument_id: '',
    instrument: {}
  };

  componentDidMount() {
    const USER = this.props.match.url;

    fetch(API + USER)
      .then(response => response.json())
      .then(session => {
        console.log('session: ', session);

        this.setState({ 
        name: session.data.attributes.name,
        currentUser: session.data.attributes.user,
        user_id: session.data.attributes.user_id,
        instrument_id: session.data.attributes.instrument_id,
        instrument: session.data.attributes.instrument
      })
      });
  }

  
 

  render() {

    return (
      <div className="session-container">
        <h1>{this.state.name} - {this.state.instrument.name}</h1>
        {this.state.instrument.name === "Bass Synth" ? <BassSynth synthParams={this.state.instrument} /> : <DosSynth synthParams={this.state.instrument} />}
      </div>
    );
  }
}

export default Session;
