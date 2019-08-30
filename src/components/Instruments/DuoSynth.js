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

export class DuoSynth extends Component {
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
        vibratoAmount: 0.5,
        vibratoRate: 5,
        harmonicity: 1.5,
        voice0Volume: -10,
        voice0Portamento: 0,
        voice0OscillatorType: "sine",
        voice0FilterEnvelopeAttack: 0.01,
        voice0FilterEnvelopeDecay: 0,
        voice0FilterEnvelopeSustain: 1,
        voice0FilterEnvelopeRelease: 0.5,
        voice0EnvelopeAttack: 0.01,
        voice0EnvelopeDecay: 0,
        voice0EnvelopeSustain: 1,
        voice0EnvelopeRelease: 0.5,
        voice1Volume: -10,
        voice1Portamento: 0,
        voice1OscillatorType: "sine",
        voice1FilterEnvelopeAttack: 0.01,
        voice1FilterEnvelopeDecay: 0,
        voice1FilterEnvelopeSustain: 1,
        voice1FilterEnvelopeRelease: 0.5,
        voice1EnvelopeAttack: 0.01,
        voice1EnvelopeDecay: 0,
        voice1EnvelopeSustain: 1,
        voice1EnvelopeRelease: 0.5
      }
    };

    this.gain = new Tone.Gain(0.1).toMaster();
    this.DuoSynth = new Tone.DuoSynth().connect(this.gain);

    // bindings
    this.handleGain = this.handleGain.bind(this);
    this.handleOsc1 = this.handleOsc1.bind(this);
    this.handleOsc2 = this.handleOsc2.bind(this);
    this.handleVibrato = this.handleVibrato.bind(this);
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
  handleOsc1 = e => {
    console.log('e: ', e.value);
    this.DuoSynth.voice0.oscillator.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice0OscillatorType: e.value
      })
    });

  }
  handleOsc2 = e => {
    console.log('e: ', e.value);
    this.DuoSynth.voice1.oscillator.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice1OscillatorType: e.value
      })
    });

  }
  handleVibrato = e => {
    this.DuoSynth.vibratoAmount.value = e[0];
    this.DuoSynth.vibratoRate.value = e[1];
    this.DuoSynth.harmonicity.value = e[2];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        vibratoAmount: e[0],
        vibratoRate: e[1],
        harmonicity: e[2]
      })
    });
  };

  handleFilter = e => {
    this.DuoSynth.voice0.filterEnvelope.attack = e[0];
    this.DuoSynth.voice0.filterEnvelope.decay = e[1];
    this.DuoSynth.voice0.filterEnvelope.sustain = e[2];
    this.DuoSynth.voice0.filterEnvelope.release = e[3];

    this.DuoSynth.voice1.filterEnvelope.attack = e[0];
    this.DuoSynth.voice1.filterEnvelope.decay = e[1];
    this.DuoSynth.voice1.filterEnvelope.sustain = e[2];
    this.DuoSynth.voice1.filterEnvelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice0FilterEnvelopeAttack: e[0],
        voice0FilterEnvelopeDecay: e[1],
        voice0FilterEnvelopeSustain: e[2],
        voice0FilterEnvelopeRelease: e[3],
        voice1FilterEnvelopeAttack: e[0],
        voice1FilterEnvelopeDecay: e[1],
        voice1FilterEnvelopeSustain: e[2],
        voice1FilterEnvelopeRelease: e[3]
      })
    });
  };

  handleEnvelope = e => {
    this.DuoSynth.voice0.envelope.attack = e[0];
    this.DuoSynth.voice0.envelope.decay = e[1];
    this.DuoSynth.voice0.envelope.sustain = e[2];
    this.DuoSynth.voice0.envelope.release = e[3];

    this.DuoSynth.voice1.envelope.attack = e[0];
    this.DuoSynth.voice1.envelope.decay = e[1];
    this.DuoSynth.voice1.envelope.sustain = e[2];
    this.DuoSynth.voice1.envelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice0EnvelopeAttack: e[0],
        voice0EnvelopeDecay: e[1],
        voice0EnvelopeSustain: e[2],
        voice0EnvelopeRelease: e[3],
        voice1EnvelopeAttack: e[0],
        voice1EnvelopeDecay: e[1],
        voice1EnvelopeSustain: e[2],
        voice1EnvelopeRelease: e[3]
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
    this.DuoSynth.triggerAttack(note);
  }

  onUpKey(note) {
    this.DuoSynth.triggerRelease();
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
        this.DuoSynth.triggerAttack(`${pressedNote}${this.state.octave}`);
        this.setState({ firstPressed: !this.state.firstPressed });
      }
    }
  };

  onKeyLifted = e => {
    this.DuoSynth.triggerRelease();
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
          className="duo-synth"
          tabIndex={1}
          ref="divFocus"
          onKeyPress={this.onKeyPressed}
          onKeyUp={this.onKeyLifted}
        >
           <TitleAndChildren title="Gain">
            <Dial value="0.4" onChange={this.handleGain} />
          </TitleAndChildren>

          <TitleAndChildren title="Osc 1">
            <Select options={["sine","square","sawtooth","triangle"]} value={"sine"} onChange={this.handleOsc1}/>
          </TitleAndChildren>

          <TitleAndChildren title="Osc 2">
            <Select options={["sine","square","sawtooth","triangle"]} value={"sine"} onChange={this.handleOsc2}/>
          </TitleAndChildren>

           <TitleAndChildren title="Vibrato">
            <Multislider
              size={[100, 100]}
              numberOfSliders="3"
              min="0"
              max="10"
              candycane="3"
              values={[
                this.state.settings.vibratoAmount,
                this.state.settings.vibratoRate,
                this.state.settings.harmonicity
              ]}
              onChange={this.handleVibrato}
            />
          </TitleAndChildren>

           <TitleAndChildren title="Filter Env">
            <Multislider
              size={[100, 100]}
              numberOfSliders="3"
              min="0"
              max="10"
              candycane="3"
              values={[
                this.state.settings.voice0FilterEnvelopeAttack,
                this.state.settings.voice0FilterEnvelopeDecay,
                this.state.settings.voice0FilterEnvelopeSustain,
                this.state.settings.voice0FilterEnvelopeRelease
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
                this.state.settings.voice0EnvelopeAttack,
                this.state.settings.voice0EnvelopeDecay,
                this.state.settings.voice0EnvelopeSustain,
                this.state.settings.voice0EnvelopeRelease
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

export default DuoSynth;
