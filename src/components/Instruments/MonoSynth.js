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
      <h5 className={"subtitle"}>{title}</h5>
      {children}
    </div>
  );
}



export class MonoSynth extends Component {
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
        frequency: "C4",
        detune: 0,
        oscillatorType: "sine",
        envelopeAttack: 0.001,
        envelopeDecay: 0.1,
        envelopeSustain: 0.9,
        envelopeRelease: 1,
        filterEnvelopeAttack: 0.06,
        filterEnvelopeDecay: 0.2,
        filterEnvelopeSustain: 0.5,
        filterEnvelopeRelease: 1
      }
    };

    this.gain = new Tone.Gain(0.1).toMaster();
    this.MonoSynth = new Tone.MonoSynth().connect(this.gain);

    // bindings
    this.handleGain = this.handleGain.bind(this);
    this.handleOscType = this.handleOscType.bind(this);
    this.handleEnvelope = this.handleEnvelope.bind(this);
    this.handleFilterEnvelope = this.handleFilterEnvelope.bind(this);

    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onKeyLifted = this.onKeyLifted.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);
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
    this.setState({ synthName: name.target.value });
  };

  handleGain = e => {
    this.gain.gain.value = e;
  };

  handleOscType = e => {
    console.log("e: ", e.value);
    this.MonoSynth.oscillator.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        oscillatorType: e.value
      })
    });
  };

  handleEnvelope = e => {
    this.MonoSynth.envelope.attack = e[0];
    this.MonoSynth.envelope.decay = e[1];
    this.MonoSynth.envelope.sustain = e[2];
    this.MonoSynth.envelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        envelopeAttack: e[0],
        envelopeDecay: e[1],
        envelopeSustain: e[2],
        envelopeRelease: e[3]
      })
    });
  };

  handleFilterType = e => {
    console.log("e: ", e.value);
    this.MonoSynth.filter.type = e.value;

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        filterType: e.value
      })
    });
  };

  handleFilterEnvelope = e => {
    this.MonoSynth.filterEnvelope.attack = e[0];
    this.MonoSynth.filterEnvelope.decay = e[1];
    this.MonoSynth.filterEnvelope.sustain = e[2];
    this.MonoSynth.filterEnvelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        filterEnvelopeAttack: e[0],
        filterEnvelopeDecay: e[1],
        filterEnvelopeSustain: e[2],
        filterEnvelopeRelease: e[3]
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
    this.MonoSynth.triggerAttack(note);
  }

  onUpKey(note) {
    this.MonoSynth.triggerRelease();
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
        pressedNote = null;
      }
      if (keyNote === ".") {
        this.setState({ octave: this.state.octave + 1 });
        pressedNote = null;
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
        this.MonoSynth.triggerAttack(`${pressedNote}${this.state.octave}`);
        this.setState({ firstPressed: !this.state.firstPressed });
      }
    }
  };

  onKeyLifted = e => {
    console.log("e: ", e.key);

    this.MonoSynth.triggerRelease();
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
    })
      .then(res => res.json())
      .then(synthObject => {
        console.log("promised synth: ", synthObject);
        console.log("compared this.props.synthApi: ", this.props.synthApi);
        this.setState({
          synthType: synthObject.instrument_type,
          synthName: synthObject.name
        });
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

  consoleUI = e => {
    console.log("consoleUI", e);
  };

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



        <div
          className="mono-synth"
          tabIndex={1}
          ref="divFocus"
          onKeyPress={this.onKeyPressed}
          onKeyUp={this.onKeyLifted}
        >
          <TitleAndChildren title="Gain">
            <Dial value="0.4" onChange={this.handleGain} />
          </TitleAndChildren>

          <TitleAndChildren title="Oscillator">
            <Select
              options={["sine", "square", "sawtooth", "triangle"]}
              value={"sine"}
              onChange={this.handleOscType}
            />
          </TitleAndChildren>

          <TitleAndChildren title="Filter">
            <Select
              options={[
                "lowpass",
                "highpass",
                "bandpass",
                "lowshelf",
                "highshelf",
                "peaking",
                "notch",
                "allpass"
              ]}
              value={"lowpass"}
              onChange={this.handleFilterType}
            />
          </TitleAndChildren>

          <TitleAndChildren title="ADSR">
            <Multislider
              size={[100, 100]}
              numberOfSliders="4"
              min="0"
              max="10"
              candycane="3"
              values={[
                this.state.settings.envelopeAttack,
                this.state.settings.envelopeDecay,
                this.state.settings.envelopeSustain,
                this.state.settings.envelopeRelease
              ]}
              onChange={this.handleEnvelope}
            />
          </TitleAndChildren>

          <TitleAndChildren title="Filter Env">
            <Multislider
              size={[100, 100]}
              numberOfSliders="4"
              min="0"
              max="10"
              candycane="4"
              values={[
                this.state.settings.filterEnvelopeAttack,
                this.state.settings.filterEnvelopeDecay,
                this.state.settings.filterEnvelopeSustain,
                this.state.settings.filterEnvelopeRelease
              ]}
              onChange={this.handleFilterEnvelope}
            />
          </TitleAndChildren>

          <KeyBoard
            handleClickOctave={this.handleClickOctave}
            octave={this.state.octave}
            onDownKey={this.onDownKey}
            onUpKey={this.onUpKey}
          />
        </div>
      </div>
    );
  }
}

export default MonoSynth;
