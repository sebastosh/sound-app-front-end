import React from "react";
import Popup from 'reactjs-popup'
import DuoSynth from "./Instruments/DuoSynth";
import MonoSynth from "./Instruments/MonoSynth";
import DrumSynth from "./Instruments/DrumSynth";
import NewInstrumentForm from './NewInstrumentForm'


const API = "http://localhost:3000";

class Session extends React.Component {
  state = {
    sessionName: "",
    sessionId: 0,
    currentUser: {},
    sessionInstruments: [],
    newInstruments: [],
    help: false,
    addNew: false
  };

  componentDidMount() {
    const USER = this.props.match.url;

    fetch(API + USER)
      .then(response => response.json())
      .then(session => {
        console.log("session: ", session);

        this.setState({
          sessionName: session.data.attributes.name,
          sessionInstruments: session.data.attributes.instruments
        });
      });
  }

  showHelp = e => {
    console.log("e: ", e);
    this.setState({ help: !this.state.help });
  };

  addNewInstrument = () => {
    this.setState({
      addNew: !this.state.addNew
    });
   
  }

  render() {
    let sessionInstruments = this.state.sessionInstruments.map(instrument => {
      switch (instrument.instrument_type) {
        case "MonoSynth":
          return <MonoSynth key={instrument.id} synthApi={instrument} />;
        case "DuoSynth":
          return <DuoSynth key={instrument.id} synthApi={instrument} />;
        case "DrumSynth":
          return <DrumSynth key={instrument.id} synthApi={instrument} />;
        default:
          return null;
      }
    });

    return (
      <div className="session-container">
        <h1>{this.state.sessionName}</h1>

          {/* <Popup
            trigger={
              <span className="help-button" role="img" aria-label="Help">
                ？
              </span>
            }
            position="bottom left"
          >
            <img className="key-ui" src="/Piano.png" />
          </Popup> */}
          
        <button onClick={this.addNewInstrument}>Add Synth</button>

        {this.state.addNew ? <NewInstrumentForm />:null}  

        {sessionInstruments}
      </div>
    );
  }
}

export default Session;
