import React from "react";
import DuoSynth from "../components/Instruments/DuoSynth";
import MonoSynth from "../components/Instruments/MonoSynth";
import FMSynth from "../components/Instruments/FMSynth";
import NewInstrumentForm from "../components/NewInstrumentForm";
import EditSessionForm from "../components/EditSessionForm";


const API = "http://localhost:3000";

class Session extends React.Component {
  state = {
    sessionName: "",
    sessionInstruments: [],
    addNew: false,
    editSessionName: false,
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

  newInstrumentForm = () => {
    this.setState({
      addNew: !this.state.addNew
    });
  };

  addNewInstrument = instrument => {
    console.log("instrument: ", instrument);
    this.setState({
      sessionInstruments: [instrument, ...this.state.sessionInstruments]
    });
  };

  editSessionName = e => {
    console.log("e: ", e.target.value);
    this.setState({ editSessionName: !this.state.editSessionName });
  };

  updateSessionName = name => {
    const SESSION_URL = this.props.match.url;

    fetch(API + SESSION_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ name: name })
    })
      .then(res => res.json())
      .then(synthObject => {
        this.setState({
          sessionName: synthObject.name,
          editSessionName: !this.state.editSessionName
        });
      });
  };


  removeSynth = synthId => {
    console.log("remove synth: ", synthId);
    const newInstrumentsArray = this.state.sessionInstruments.filter(
      instrument => instrument.id !== synthId
    );
    console.log("newInstrumentsArray: ", newInstrumentsArray);
    this.setState({
      sessionInstruments: newInstrumentsArray
    });
  };

  render() {
    let sessionInstruments = this.state.sessionInstruments.map(instrument => {
      switch (instrument.instrument_type) {
        case "MonoSynth":
          return (
            <MonoSynth
              key={instrument.id}
              synthApi={instrument}
              removeSynth={this.removeSynth}
            />
          );
        case "DuoSynth":
          return (
            <DuoSynth
              key={instrument.id}
              synthApi={instrument}
              removeSynth={this.removeSynth}
            />
          );
        case "FMSynth":
          return <FMSynth key={instrument.id} synthApi={instrument} removeSynth={this.removeSynth} />;
        default:
          return null;
      }
    });

    return (
      <div className="session-container">
        {this.state.editSessionName ? (
          <EditSessionForm
            editSessionName={this.editSessionName}
            updateSessionName={this.updateSessionName}
            addNewInstrument={this.addNewInstrument}
            sessionName={this.state.sessionName}
          />
        ) : (
          <div>
            <h1 onClick={this.editSessionName}>{this.state.sessionName}</h1>
            <div className="add-synth" onClick={this.newInstrumentForm}>
            + Add Synth
            </div>
           

          </div>
        )}

        {this.state.addNew ? (
          <NewInstrumentForm
            newInstrumentForm={this.newInstrumentForm}
            addNewInstrument={this.addNewInstrument}
            sessionName={this.state.sessionName}
          />
        ) : null}

        {sessionInstruments}
      </div>
    );
  }
}

export default Session;
