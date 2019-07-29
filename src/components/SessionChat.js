import React from "react";
import DuoSynth from './Instruments/DuoSynth'
import MonoSynth from './Instruments/MonoSynth'
// import NewSynth from "./Instruments/NewSynth";

const API = "http://localhost:3000";

class Session extends React.Component {
  state = {    
    sessionName: '',
    currentUser: {},
    user_id: '',
    instrument_id: '',
    instrument: {},
    chats: [],
		openChat: null,
		name: ""
  };

  componentDidMount() {
    const USER = this.props.match.url;

    fetch(API + USER)
      .then(response => response.json())
      .then(session => { 
        this.setState({ 
        sessionName: session.data.attributes.name,
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
        <h1>{this.state.sessionName} - {this.state.instrument.name}</h1>
        {this.state.instrument.name === "Bass Synth" ? <MonoSynth synthApi={this.state.instrument} /> : <DuoSynth synthApi={this.state.instrument} />}
      </div>
    );
  }
}

export default Session;
