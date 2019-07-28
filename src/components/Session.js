import React from "react";
import DosSynth from './Instruments/DosSynth'
import Synth from './Instruments/Synth'


const API = "http://localhost:3000";

class Session extends React.Component {
  state = {    
    sessionName: '',
    currentUser: {},
    instruments: []
  };

  componentDidMount() {
    const USER = this.props.match.url;

    fetch(API + USER)
      .then(response => response.json())
      .then(session => { 
        console.log('session: ', session);

        this.setState({ 
        sessionName: session.data.attributes.name,
        // currentUser: session.data.attributes.user,
        // user_id: session.data.attributes.user_id,
        // instrument_id: session.data.attributes.instrument_id,
        instruments: session.data.attributes.instruments
      })
      });
  }

  
 

  render() {

    let instruments = this.state.instruments.map(instrument => {
      return (
        instrument.instrument_type === "Synth" ? <Synth key={instrument.id} synthApi={instrument} /> : <DosSynth key={instrument.id} synthApi={instrument} />
 
      );
    });



    return (
      <div className="session-container">
        <h1>{this.state.sessionName}</h1>
        {instruments}
        
      </div>
    );
  }
}

export default Session;
