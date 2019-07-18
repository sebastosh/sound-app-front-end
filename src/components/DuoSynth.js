import React, { Component } from "react";
import { Dial, Toggle, Slider, TextButton } from "react-nexusui";
import Tone from "tone";
import KeyboardEventHandler from "react-keyboard-event-handler";

const synthGain = new Tone.Gain(0.1).toMaster();

const duoSynth = new Tone.DuoSynth().connect(synthGain);

export class Synth extends Component {
  state = {
    octave: 4,
    frequency: "C4",
    attack: 0.01,
    release: 1
  };

  handleGain = e => {
    synthGain.gain.value = e;
  };

  handleRelease = duration => {
    this.setState({ release: duration });
  };

  octaveUp = () => {
    if (this.state.octave < 8) this.setState({ octave: this.state.octave + 1 });
    console.log("sdfsf");
  };

  octaveDown = () => {
    if (this.state.octave > 0) this.setState({ octave: this.state.octave - 1 });
    console.log("sdfsf");
  };

  handlePlayKeys = key => {
    let octave = this.state.octave;
    let release = this.state.release;
    if (key === "z") {
      duoSynth.triggerAttackRelease(`C${octave}`, release);
    }
    if (key === "s") {
      duoSynth.triggerAttackRelease(`C#${octave}`, release);
    }
    if (key === "x") {
      duoSynth.triggerAttackRelease(`D${octave}`, release);
    }
    if (key === "d") {
      duoSynth.triggerAttackRelease(`D#${octave}`, release);
    }
    if (key === "c") {
      duoSynth.triggerAttackRelease(`E${octave}`, release);
    }
    if (key === "v") {
      duoSynth.triggerAttackRelease(`F${octave}`, release);
    }
    if (key === "g") {
      duoSynth.triggerAttackRelease(`F#${octave}`, release);
    }
    if (key === "b") {
      duoSynth.triggerAttackRelease(`G${octave}`, release);
    }
    if (key === "h") {
      duoSynth.triggerAttackRelease(`G#${octave}`, release);
    }
    if (key === "n") {
      duoSynth.triggerAttackRelease(`A${octave}`, release);
    }
    if (key === "j") {
      duoSynth.triggerAttackRelease(`A#${octave}`, release);
    }
    if (key === "m") {
      duoSynth.triggerAttackRelease(`B${octave}`, release);
    }
  };

  render() {
    return (
      <div>
        <KeyboardEventHandler
          handleKeys={[
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
            "m"
          ]}
          onKeyEvent={(key, e) => {
            this.handlePlayKeys(key);
            // console.log(`do something upon keydownevent of ${key}`);
          }}
        />
        <h2>Duo Synth</h2>

        <div className="handlers">
          <button onClick={this.octaveDown}>➖</button>{" "}
          <button onClick={this.octaveUp}>➕</button>
          <Dial onChange={this.handleGain} />
          <Dial value="1" min="0" max="3" onChange={this.handleRelease} />
        </div>
      </div>
    );
  }
}

export default Synth;
