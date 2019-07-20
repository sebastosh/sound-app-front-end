import React, { Component } from "react";
import Tone from "tone";
import { Dial, Multislider } from "react-nexusui";
import Key from "./Piano/Key";
import Octaves from "./Piano/Octaves";
import ReactDOM from "react-dom";

export class Keys extends Component {
  constructor(props) {
    super(props);

    // tone.js build

    // this.vol = new Tone.Volume(0);
    // this.synth = new Tone.Synth().toMaster();
    // this.synth.chain(this.vol, Tone.Master);
    
    this.gain = new Tone.Gain(0.1).toMaster();

    this.synth = new Tone.Synth().connect(this.gain);
    
    // bindings
    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);

    this.state = {
      firstPressed: false,
      octave: 1     
    };
  }

  handleGain = e => {
    this.gain.gain.value = e 
    console.log('this.vol.volume.value: ', this.gain.gain.value);

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

  render() {
    console.clear()
    console.log(this.gain.gain.value);
    return (
      <div
        className="synth"
        tabIndex={1}
        ref="divFocus"
        onKeyPress={this.onKeyPressed}
        onKeyUp={this.onKeyLifted}
      >
        <h2>Bass Synth</h2>
        <div className="handlers">
          <Dial onChange={this.handleGain} />
        </div>

        <div className="handlers">
          <Multislider
            size={[100, 100]}
            numberOfSliders="4"
            min="0"
            max="1"
            candycane="1"
            values={[
              this.state.envelopeAttack,
              this.state.envelopeDecay,
              this.state.envelopeSustain,
              this.state.envelopeRelease
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
      </div>
    );
  }
}

export default Keys;
