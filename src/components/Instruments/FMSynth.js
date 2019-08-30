import React, { Component } from "react";
import Tone from "tone";
import {
  Dial,
  Multislider,
  Select,
} from "react-nexusui";

import ReactDOM from "react-dom";
import KeyBoard from "./Piano/KeyBoard";

function TitleAndChildren({ children, title }) {
  return (
    <div style={{ margin: 0 }}>
      <h4 className={"subtitle"}>{title}</h4>
      {children}
    </div>
  );
}

export class FMSynth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentNameToggle: false,
      firstPressed: false,
      gain: 0.4,
      octave: 3,
      synthName: "",
      synthType: "",
      settings: {
        harmonicity: 1.5,
        modulationIndex: 0,
        oscillatorType: "sine",
        modulationType: "sine",
        modulationEnvelopeAttack: 0.01,
        modulationEnvelopeDecay: 0,
        modulationEnvelopeSustain: 1,
        modulationEnvelopeRelease: 0.5,
        envelopeAttack: 0.01,
        envelopeDecay: 0,
        envelopeSustain: 1,
        envelopeRelease: 0.5
      }
    };

    this.gain = new Tone.Gain(0.1).toMaster();
    this.FMSynth = new Tone.FMSynth().connect(this.gain);

    // bindings
    this.handleGain = this.handleGain.bind(this);
    this.handleOsc1 = this.handleOsc1.bind(this);
    this.handleOsc2 = this.handleOsc2.bind(this);
    this.handleHarmonicity = this.handleHarmonicity.bind(this);
    this.handleModulationIndex = this.handleModulationIndex.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEnvelope = this.handleEnvelope.bind(this);

    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onKeyLifted = this.onKeyLifted.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);
  
    // this.sequencer = new Nexus.Sequencer('#sequencer');


  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.divFocus).focus();
  }

  componentWillReceiveProps(props) {
    this.setState({
      synthType: props.synthApi.instrument_type,
      synthName: props.synthApi.name
    });

    if (props.synthApi.settings !== null) {
      this.setState({
        settings: props.synthApi.settings
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
    this.setState({synthName: name.target.value})
  }

  handleGain = e => {
    this.gain.gain.value = e;
  };

  handleHarmonicity = e => {
    console.log('e: ', e);
    this.FMSynth.harmonicity.value = e;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        harmonicity: e
      })
  })
}

handleModulationIndex = e => {
  this.FMSynth.modulationIndex.value = e;

  this.setState({
    settings: Object.assign({}, this.state.settings, {
      modulationIndex: e
    })
})
}



  handleOsc1 = e => {
    console.log('e: ', e.value);
    this.FMSynth.oscillator.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        oscillatorType: e.value
      })
    });

  }
  handleOsc2 = e => {
    console.log('e: ', e.value);
    this.FMSynth.modulation.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        modulationType: e.value
      })
    });

  }

  handleFilter = e => {

    this.FMSynth.modulationEnvelope.attack = e[0];
    this.FMSynth.modulationEnvelope.decay = e[1];
    this.FMSynth.modulationEnvelope.sustain = e[2];
    this.FMSynth.modulationEnvelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        modulationEnvelopeAttack: e[0],
        modulationEnvelopeDecay: e[1],
        modulationEnvelopeSustain: e[2],
        modulationEnvelopeRelease: e[3],

      })
    });
  };

  handleEnvelope = e => {
    this.FMSynth.envelope.attack = e[0];
    this.FMSynth.envelope.decay = e[1];
    this.FMSynth.envelope.sustain = e[2];
    this.FMSynth.envelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        envelopeAttack: e[0],
        envelopeDecay: e[1],
        envelopeSustain: e[2],
        envelopeRelease: e[3],
        
      })
    });
  };

  handleClickOctave(action) {
    switch (action) {
      case "minus":
        this.setState({ octave: this.state.octave - 1 });
        break;
      case "plus":
        this.setState({ octave: this.state.octave + 1 });
        break;
      default:
        this.setState({ octave: 1 });
        break;
    }
  }

  onDownKey(note) {
    this.FMSynth.triggerAttack(note);
  }

  onUpKey(note) {
    this.FMSynth.triggerRelease();
  }

  onKeyPressed = e => {
    let keyNote = e.key;
    let keyBoardKeys = [
      "z",
      "s",
      "x",
      "d",
      "c",
      "v",
      "g",
      "b",
      "h",
      "n",
      "j",
      "m",
      ",", 
      "."
    ];

    if (keyBoardKeys.includes(keyNote)) {
      let pressedNote;

      if (keyNote === ",") {
        this.setState({ octave: this.state.octave - 1 });
        pressedNote = null
      }
      if (keyNote === ".") {
        this.setState({ octave: this.state.octave + 1 });
        pressedNote = null
      }
      
      if (keyNote === "z") {
        pressedNote = "C";
      }
      if (keyNote === "s") {
        pressedNote = "C#";
      }
      if (keyNote === "x") {
        pressedNote = "D";
      }
      if (keyNote === "d") {
        pressedNote = "D#";
      }
      if (keyNote === "c") {
        pressedNote = "E";
      }
      if (keyNote === "v") {
        pressedNote = "F";
      }
      if (keyNote === "g") {
        pressedNote = "F#";
      }
      if (keyNote === "b") {
        pressedNote = "G";
      }
      if (keyNote === "h") {
        pressedNote = "G#";
      }
      if (keyNote === "n") {
        pressedNote = "A";
      }
      if (keyNote === "j") {
        pressedNote = "A#";
      }
      if (keyNote === "m") {
        pressedNote = "B";
      }

      if (!this.state.firstPressed && keyNote !== "," && keyNote !== ".") {
        this.FMSynth.triggerAttack(`${pressedNote}${this.state.octave}`);
        this.setState({ firstPressed: !this.state.firstPressed });
      }
    }
  };

  onKeyLifted = e => {
    this.FMSynth.triggerRelease();
    this.setState({ firstPressed: !this.state.firstPressed });
  };

  saveSynth = () => {
    let synthFromState = {
      name: this.state.synthName,
      settings: this.state.settings
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

  render() {
    return (
      <div>
      {this.state.instrumentNameToggle ? 
            <div className="synth-title">

            <input
              ref="divFocus"
              tabIndex={1}
              type="text"
              value={this.state.name}
              placeholder={this.state.synthName}
              onBlur={this.instrumentNameToggle}
              onChange={this.updateInstrumentName}
              name="name"
            />
  
        </div>: <div onClick={this.instrumentNameToggle} className="synth-title">{this.state.synthName}</div>}

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

        <div
          className="fm-synth"
          tabIndex={1}
          ref="divFocus"
          onKeyPress={this.onKeyPressed}
          onKeyUp={this.onKeyLifted}
        >
           <TitleAndChildren title="Gain">
            <Dial value="0.4" onChange={this.handleGain} />
          </TitleAndChildren>

          <TitleAndChildren title="Harmonicity">
            <Dial value="2" max="4" onChange={this.handleHarmonicity} />
          </TitleAndChildren>

          <TitleAndChildren title="Mod Index">
            <Dial value="10" min="0" max="40" onChange={this.handleModulationIndex} />
          </TitleAndChildren>

          <TitleAndChildren title="Osc">
            <Select options={["sine","square","sawtooth","triangle"]} value={"sine"} onChange={this.handleOsc1}/>
          </TitleAndChildren>

          <TitleAndChildren title="Mod">
            <Select options={["sine","square","sawtooth","triangle"]} value={"sine"} onChange={this.handleOsc2}/>
          </TitleAndChildren>

          <TitleAndChildren title="Filter Env">
            <Multislider
              size={[100, 100]}
              numberOfSliders="3"
              min="0"
              max="10"
              candycane="3"
              values={[
                this.state.settings.modulationEnvelopeAttack,
                this.state.settings.modulationEnvelopeDecay,
                this.state.settings.modulationEnvelopeSustain,
                this.state.settings.modulationEnvelopeRelease
              ]}
              onChange={this.handleFilter}
            />
            
          </TitleAndChildren>

           <TitleAndChildren title="Env ADSR">
            <Multislider
              size={[100, 100]}
              numberOfSliders="4"
              min="0"
              max="10"
              candycane="4"
              values={[
                this.state.settings.envelopeAttack,
                this.state.settings.envelopeDecay,
                this.state.settings.envelopeSustain,
                this.state.settings.envelopeRelease
              ]}
              onChange={this.handleEnvelope}
            />
          </TitleAndChildren>
          <KeyBoard
            handleClickOctave={this.handleClickOctave}
            octave={this.state.octave}
            onDownKey={this.onDownKey}
            onUpKey={this.onUpKey}
          />
          {/* <TitleAndChildren title="Sequencer">
            <Sequencer
              rows={5}
              columns={10}
              size={[400, 200]}
              onStep={console.warn}
              onReady={this.sequencer.current = this.sequencer}
            />
            <div>
              <button
                onClick={() => {
                  this.sequencer.current.start(500);
                }}
              >
                Play Sequencer
              </button>
              <button
                onClick={() => {
                  this.sequencer.current.stop(500);
                }}
              >
                Stop Sequencer
              </button>
            </div>
          </TitleAndChildren> */}
        </div>
      </div>
    );
  }
}

export default FMSynth;
