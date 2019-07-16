import React, { Component } from "react";
import { Dial, Toggle, Sequencer } from "react-nexusui";
import Tone from "tone";

// const transport = new Tone.Transport() 

const synthGain = new Tone.Gain(0.1).toMaster();

const duoSynth = new Tone.DuoSynth().connect(synthGain);

export class Synth extends Component {
    state = {
        frequency: 'C4',
    }

    componentDidMount() {
        duoSynth.frequency.value = this.state.frequency
    }

  handleAttack = e => {
    if (e) {
      duoSynth.triggerAttack(this.state.frequency);
    } else {
      duoSynth.triggerRelease();
    }
  };

  handleGain = e => {
      synthGain.gain.value = e
      
}

  handleFreq = e => {
      duoSynth.frequency.value = e
      this.setState({frequency:duoSynth.frequency.value})}
  ;

  render() {
    return (
      <div className="module">
        <h2>Duo Synth</h2>
        <div className="knobs" ><Toggle state="false" onChange={this.handleAttack} /></div>
        <div className="knobs" ><Dial onChange={this.handleGain} /></div>
        <div className="knobs" ><Dial value="300" min="0" max="1000" onChange={this.handleFreq} /></div>
        <div className="knobs" ><Sequencer /></div>
      </div>
    );
  }
}

export default Synth;
