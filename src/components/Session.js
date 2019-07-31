import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Popup from 'reactjs-popup'
import DuoSynth from "./Instruments/DuoSynth";
import MonoSynth from "./Instruments/MonoSynth";
import DrumSynth from "./Instruments/DrumSynth";
import NewInstrumentForm from './NewInstrumentForm'
import EditSessionForm from './EditSessionForm'
import Chats from "../containers/Chats";


const API = "http://localhost:3000";

class Session extends React.Component {
  state = {
    sessionName: "",
    sessionInstruments: [],
    help: false,
    addNew: false,
    editSessionName: false,
    openChatBox: false, 
  };

  componentDidMount() {
    const SESSION_URL = this.props.match.url;

    fetch(API + SESSION_URL)
      .then(response => response.json())
      .then(session => {
       
        this.setState({
          sessionName: session.data.attributes.name,
          sessionInstruments: session.data.attributes.instruments
        });
      });
  }

  showHelp = e => {
    this.setState({ help: !this.state.help });
  };

  newInstrumentForm = () => {
    this.setState({
      addNew: !this.state.addNew
    });   
  }

  addNewInstrument = instrument => {
    console.log('instrument: ', instrument);
    this.setState({
      sessionInstruments: [instrument, ...this.state.sessionInstruments]
    })

  }

  editSessionName = e => {
    console.log('e: ', e.target.value);
    this.setState({editSessionName: !this.state.editSessionName})
  }

  updateSessionName = (name) => {
    const SESSION_URL = this.props.match.url;

    fetch(API + SESSION_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name: name})
         })
      .then(res => res.json())
      .then(synthObject => {
        this.setState({sessionName: synthObject.name,
          editSessionName: !this.state.editSessionName})       
      });
  }

  openChatBox = () => {
    this.setState({openChatBox:!this.state.openChatBox})
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
       {this.state.editSessionName ? (<EditSessionForm editSessionName={this.editSessionName} updateSessionName={this.updateSessionName} addNewInstrument={this.addNewInstrument} sessionName={this.state.sessionName} />) : (<div><h1 onClick={this.editSessionName}>{this.state.sessionName}</h1><div className="add-synth" onClick={this.newInstrumentForm}>+</div><span onClick={this.openChatBox} role="img" aria-label="chat">
              💬
            </span></div>)}
        

        {this.state.addNew ? <NewInstrumentForm newInstrumentForm={this.newInstrumentForm} addNewInstrument={this.addNewInstrument} sessionName={this.state.sessionName} />:null}  

        {this.state.openChatBox ? <div id="chat-container"><Chats sessionName={this.state.sessionName} currentUser={this.props.currentUser} /></div> : null }
        {sessionInstruments}
       
      </div>
    );
  }
}

export default Session;
