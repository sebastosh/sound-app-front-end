import React, { Component } from "react";
import Tone from "tone";
import { Dial, Multislider } from "react-nexusui";
import Key from "./Piano/Key";
import Octaves from "./Piano/Octaves";
import ReactDOM from "react-dom";

export class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPressed: false,
      octave: 1,
      name: "",
      settings: {
        vibratoAmount: 0.5,
        vibratoRate: 5,
        harmonicity: 1.5,
        voice0: {
          volume: -10,
          portamento: 0,
          oscillator: {
            type: "sine"
          },
          filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5
          },
          envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5
          }
        },
        voice1: {
          volume: -10,
          portamento: 0,
          oscillator: {
            type: "sine"
          },
          filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5
          },
          envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5
          }
        }
      }
    };

    this.gain = new Tone.Gain(0.1).toMaster();
    this.synth = new Tone.DuoSynth().connect(this.gain);

    // bindings
    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);
  }

  handleEnvelope = e => {
    console.log("e: ", e[0], e[1], e[2], e[3]);

    console.log("voice0.envelope.attack: ", this.synth.voice0.envelope.attack);
  

    this.synth.voice0.envelope.attack = e[0];
    this.synth.voice0.envelope.decay = e[1];
    this.synth.voice0.envelope.sustain = e[2];
    this.synth.voice0.envelope.release = e[3];

    this.synth.voice1.envelope.attack = e[0];
    this.synth.voice1.envelope.decay = e[1];
    this.synth.voice1.envelope.sustain = e[2];
    this.synth.voice1.envelope.release = e[3];
    // this.setState({
      
    //     setting: Object.assign({}, this.state.setting, {
    //       envelope: { 
    //         attack: e[0],
    //         decay: e[1],
    //         sustain: e[2],
    //         release: e[3]
    //       }
    //     })
    //   });
 
    };
 

  handleGain = e => {
    this.gain.gain.value = e;
    console.log("this.vol.volume.value: ", this.gain.gain.value);

    // this.vol.value = e;
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

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.divFocus).focus();
  }

  onDownKey(note) {
    console.log(`${note} played`);
    this.synth.triggerAttack(note);
  }

  onUpKey(note) {
    this.synth.triggerRelease();
  }

  onKeyPressed = e => {
    let pressedNote;
    if (e.key === "z") {
      pressedNote = "C";
    }
    if (e.key === "s") {
      pressedNote = "C#";
    }
    if (e.key === "x") {
      pressedNote = "D";
    }
    if (e.key === "d") {
      pressedNote = "D#";
    }
    if (e.key === "c") {
      pressedNote = "E";
    }
    if (e.key === "v") {
      pressedNote = "F";
    }
    if (e.key === "g") {
      pressedNote = "F#";
    }
    if (e.key === "b") {
      pressedNote = "G";
    }
    if (e.key === "h") {
      pressedNote = "G#";
    }
    if (e.key === "n") {
      pressedNote = "A";
    }
    if (e.key === "j") {
      pressedNote = "A#";
    }
    if (e.key === "m") {
      pressedNote = "B";
    }

    if (!this.state.firstPressed) {
      this.synth.triggerAttack(`${pressedNote}${this.state.octave}`);
      this.setState({ firstPressed: !this.state.firstPressed });
    }
  };

  onKeyLifted = e => {
    console.log("lifted", e.key);
    this.synth.triggerRelease();
    this.setState({ firstPressed: !this.state.firstPressed });
  };

  sendSynth = () => {
    this.props.saveSynth();
  };

  saveSynth = () => {
    let synthParams = {
      name: `${this.props.synthParams.name}`,
      settings: {
        type: "triangle",
        attack: `${this.state.settings.attack}`,
        decay: `${this.state.settings.decay}`,
        sustain: `${this.state.settings.sustain}`,
        release: `${this.state.settings.release}`
      }
    };

    console.log("this.props.synthParams: ", this.props.synthParams.id);
    console.log("synthParams: ", synthParams);
    fetch(`http://localhost:3000/instruments/${this.props.synthParams.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(synthParams)
    })
      .then(res => res.json())
      .then(synthObject => {
        console.log("synthObject: ", synthObject);
        // this.props.addSession(synthObject)
        // this.props.history.push("/")
      });
  };

  render() {
    return (
      <div
        className="duo-synth"
        tabIndex={1}
        ref="divFocus"
        onKeyPress={this.onKeyPressed}
        onKeyUp={this.onKeyLifted}
      >
        <div className="handlers">
          <Dial onChange={this.handleGain} />
        </div>

        <div className="handlers">
          <Multislider
            size={[100, 100]}
            numberOfSliders="4"
            min="0"
            max="30"
            candycane="4"
            values={[
              this.state.settings.attack,
              this.state.settings.decay,
              this.state.settings.sustain,
              this.state.settings.release
            ]}
            onChange={this.handleEnvelope}
          />
        </div>
        <div className="Keys">
          <Key
            note={`C${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Db${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`D${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Eb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`E${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`F${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Gb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`G${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Ab${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`A${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Bb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`B${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
        </div>
        <Octaves
          octave={this.state.octave}
          handleClick={this.handleClickOctave}
        />
        <span className="save-synth" onClick={this.saveSynth}>
          💾
        </span>
      </div>
    );
  }
}

export default Keys;
