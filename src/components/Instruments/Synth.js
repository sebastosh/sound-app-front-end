import React, { Component } from "react";
import Tone from "tone";
import { Dial, Multislider, Sequencer } from "react-nexusui";
import Nexus from "nexusui"
import Key from "./Piano/Key";
import Octaves from "./Piano/Octaves";
import ReactDOM from "react-dom";
import StepSequencer from "../Sequencer/StepSequencer";

export class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPressed: false,
      octave: 3,
      name: "",
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 1
    };

    this.gain = new Tone.Gain(0.4).toMaster();
    this.synth = new Tone.Synth().connect(this.gain);


    // bindings
    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);


    // this.dial = new Nexus.Dial('#dial')
    
  }

  handleGain = e => {
    this.gain.gain.value = e;
    console.log("this.vol.volume.value: ", this.gain.gain.value);

    // this.vol.value = e;
  };
  handleEnvelope = e => {
    console.log("e: ", e[0], e[1], e[2], e[3]);

    console.log("this.synth: ", this.synth);
    console.log("this.state.release: ", this.state.release);

    this.synth.envelope.attack = e[0];
    this.synth.envelope.decay = e[1];
    this.synth.envelope.sustain = e[2];
    this.synth.envelope.release = e[3];
    this.setState({
      attack: e[0],
      decay: e[1],
      sustain: e[2],
      release: e[3]
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
    let keyNote = e.key
    let keyBoardKeys = ["z","s","x","d","c","v","g","b","h","n","j","m"]
    
    if ( keyBoardKeys.includes(keyNote) ) { 
    
        let pressedNote;
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
    
        if (!this.state.firstPressed) {
          this.synth.triggerAttack(`${pressedNote}${this.state.octave}`);
          this.setState({ firstPressed: !this.state.firstPressed });
        }
      }
      };
    

  onKeyLifted = e => {
    console.log("lifted", e.key);
    this.synth.triggerRelease();
    this.setState({ firstPressed: !this.state.firstPressed });
  };

  saveSynth = () => {
    let synthParams = {
      name: this.props.synthParams.name,
      settings: {
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: this.state.attack,
          decay: this.state.decay,
          sustain: this.state.sustain,
          release: this.state.release
        }
      }
    };

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
      });
  };

  render() {
    return (
<div>
      <div
        className="synth"
        tabIndex={1}
        ref="divFocus"
        onKeyPress={this.onKeyPressed}
        onKeyUp={this.onKeyLifted}
      >
      {/* <div id="dial"></div> */}
        <div className="handler">
          <Dial value="0.4" onChange={this.handleGain} />
        </div>

        <div className="handler">
          <Multislider
            size={[100, 100]}
            numberOfSliders="4"
            min="0"
            max="30"
            candycane="4"
            values={[
              this.state.attack,
              this.state.decay,
              this.state.sustain,
              this.state.release
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
     
        <span role="img" aria-label="cross mark" className="save-synth" onClick={this.saveSynth}>
        💾
        </span>
      </div>
      <StepSequencer />
      </div>
    );
  }
}

export default Keys;
