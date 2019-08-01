import React, { Component } from "react";
import StepPlay from "./Sequencer/StepPlay";


export class StepSequencer extends Component {
  state = {
    instrumentNameToggle: false,
    synthName: "",
    synthType: "",
    musicData: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ]
  };

  componentWillReceiveProps(props) {
    this.setState({
      synthType: props.synthApi.instrument_type,
      synthName: props.synthApi.name
    });

    if (props.synthApi.settings !== null) {
      this.setState({
        musicData: props.synthApi.settings
      });
    }
  }

  instrumentNameToggle = e => {
    this.setState(
      { instrumentNameToggle: !this.state.instrumentNameToggle },
      () => {
        if (!this.state.instrumentNameToggle) {
          this.saveSynth();
        }
      }
    );
  };

  updateInstrumentName = name => {
    this.setState({ synthName: name.target.value });
  };

  saveSynth = () => {
    let synthFromState = {
      name: this.state.synthName,
      settings: this.state.musicData
    };

    fetch(`http://localhost:3000/instruments/${this.props.synthApi.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(synthFromState)
      // body: {"settings": this.state.settings}
    })
      .then(res => res.json())
      .then(synthObject => {
        console.log("promised synth: ", synthObject);
        console.log("compared this.props.synthApi: ", this.props.synthApi);
      });
  };



  removeSynth = () => {
    this.props.removeSynth(this.props.synthApi.id)

    fetch('http://localhost:3000/session_instruments/')
    .then(response => response.json())
    .then(sessionInstrumentData => {
      console.log('sessionInstrumentData: ', sessionInstrumentData);
      let thisSI = sessionInstrumentData.data.filter(
        
            si => si.attributes.instrument_id === this.props.synthApi.id
          );
          thisSI.map(instrument => { 
             fetch(`http://localhost:3000/session_instruments/${instrument.id}`, {
        method: 'delete'
    })
    .then(res => {
      fetch(`http://localhost:3000/instruments/${this.props.synthApi.id}`, {
        method: 'delete'
    })
    .then(res => console.log('res: ', res))
      
      console.log('res: ', res)})
          })
    });
      
};


  //   setTimeout(() => {
  //     audioScene()
  //   }, 0)

  //   setTimeout(
  //     function = () {
  //         audioScene()
  //     }
  //     .bind(this),
  //     3000
  // );

  //   function audioScene () {
  //     ReactDOM.render((
  //       <MusicBox data={musicData} />
  //     ), document.getElementById('js-app'))
  //   }

  render() {
    return (
      <div>
        {this.state.instrumentNameToggle ? (
          <div className="synth-title">
            <input
              type="text"
              value={this.state.name}
              placeholder={this.state.synthName}
              onBlur={this.instrumentNameToggle}
              onChange={this.updateInstrumentName}
              name="name"
            />
          </div>
        ) : (
          <div onClick={this.instrumentNameToggle} className="synth-title">
            {this.state.synthName}
          </div>
        )}

        <span
          role="img"
          aria-label="Save Synth"
          className="save-synth"
          onClick={this.saveSynth}
        >
          💾
        </span>

        <span
          role="img"
          aria-label="Save Synth"
          className="remove-synth"
          onClick={this.removeSynth}
        >
          ⓧ
        </span>

        <StepPlay data={this.state.musicData} />
      </div>
    );
  }
}

export default StepSequencer;
