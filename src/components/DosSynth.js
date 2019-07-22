import React, { Component } from "react";
import { Dial, Multislider} from "react-nexusui";
import Tone from "tone";
import KeyboardEventHandler from "react-keyboard-event-handler";

const synthGain = new Tone.Gain(0.1).toMaster();

const duoSynth = new Tone.DuoSynth().connect(synthGain);

export class Synth extends Component {
  state = {
    octave: 4,
    envelopeAttack: 0.05,
    envelopeDecay: 1,
    envelopeSustain: .2,
    envelopeRelease: .3
  };

  keyboard = ["z","s","x","d","c","v","g","b","h","n","j","m","-","="]

  handleEnvelope = e => {
    console.log('e: ', e[0]);
    this.setState({
      envelopeAttack: e[0],
      envelopeDecay: e[1],
      envelopeSustain: e[2],
      envelopeRelease: e[3] 
    })

  }



  handleGain = e => {
    synthGain.gain.value = e;
  };

  handlePlayKeys = key => {
    let octave = this.state.octave;
    if (key === "=" && this.state.octave < 8) this.setState({ octave: this.state.octave + 1 });
    if (key === "-" && this.state.octave > 0) this.setState({ octave: this.state.octave - 1 });
    
  
    let release = this.state.envelopeRelease

    // if (key === "z") {duoSynth.voice0.envelope.attack = this.state.attack}
     
    if (key === "z") {duoSynth.triggerAttackRelease(`C${octave}`, release)}

    // if (key === "s") {console.log('duoSynth.voice0.envelope.attack: ', duoSynth.voice0.envelope.attack);}
   
    if (key === "s") {duoSynth.triggerAttackRelease(`C#${octave}`, release)}
    if (key === "x") {duoSynth.triggerAttackRelease(`D${octave}`, release)}
    if (key === "d") {duoSynth.triggerAttackRelease(`D#${octave}`, release)}
    if (key === "c") {duoSynth.triggerAttackRelease(`E${octave}`, release)}
    if (key === "v") {duoSynth.triggerAttackRelease(`F${octave}`, release)}
    if (key === "g") {duoSynth.triggerAttackRelease(`F#${octave}`, release)}
    if (key === "b") {duoSynth.triggerAttackRelease(`G${octave}`, release)}
    if (key === "h") {duoSynth.triggerAttackRelease(`G#${octave}`, release)}
    if (key === "n") {duoSynth.triggerAttackRelease(`A${octave}`, release)}
    if (key === "j") {duoSynth.triggerAttackRelease(`A#${octave}`, release)}
    if (key === "m") {duoSynth.triggerAttackRelease(`B${octave}`, release)}
  }

  render() {
    return (
      <div className="synth">
        <KeyboardEventHandler handleKeys={this.keyboard}
          onKeyEvent={(key, e) => this.handlePlayKeys(key) } />

        <h2>Duo Synth</h2>

        <div className="handlers">
          <Dial onChange={this.handleGain} />
          </div>

        <div className="handlers">
          <Multislider size={[100,100]} numberOfSliders="4" min="0" max="1" candycane="1" values={[this.state.envelopeAttack,this.state.envelopeDecay,this.state.envelopeSustain,this.state.envelopeRelease]} onChange={this.handleEnvelope} />
        </div>

        
      </div>
    );
  }
}

export default Synth;
