import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import InstrumentList from "../containers/InstrumentsList";
import Select from "react-select";

export class NewInstrumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      currentUser: {},
      instruments: [],
      sessionInstruments: []
    };

    this.options = [
      { value: "MonoSynth", label: "Mono Synth" },
      { value: "DuoSynth", label: "Duo Synth" },
      { value: "DrumSynth", label: "Drum Synth" }
    ];
  }

  componentDidMount() {
    fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(instrumentData => {
        this.setState({ instruments: instrumentData.data });
      });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.state.selectedOption.map(instrument => {
      let newInstrument = {
        name: `${this.props.sessionName}-${instrument.label}`,
        instrument_type: instrument.value
      };
      console.log("newInstrument: ", newInstrument);
      fetch("http://localhost:3000/instruments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newInstrument)
      })
        .then(res => res.json())
        .then(newInstrumentReturn => {
          console.log("newInstrumentReturn.id", newInstrumentReturn.id);
          console.log(
            "this.props.match.params.sessionsId: ",
            this.props.match.params.sessionsId
          );

          let newSessionInstrument = {
            name: `${this.props.sessionName}-${instrument.label}`,
            session_id: this.props.match.params.sessionsId,
            instrument_id: newInstrumentReturn.id
          };
          console.log("newSessionInstrument: ", newSessionInstrument);

          fetch("http://localhost:3000/session_instruments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(newSessionInstrument)
          })
            .then(res => res.json())
            .then(newSessionInstrumentReturn => {
              console.log(
                "newSessionInstrumentReturn: ",
                newSessionInstrumentReturn
              );
              this.props.addNewInstrument(newInstrumentReturn);
              this.props.newInstrumentForm()
            });
        });
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <form className="new-instruments-form" onSubmit={this.handleSubmit}>
        <Select
          isMulti
          name="synths"
          options={this.options}
          className="basic-multi-select"
          onChange={this.handleChange}
          placeholder="Select One or More Synths"
        />
      </form>
    );
  }
}

export default withRouter(NewInstrumentForm);
