import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Nexus from 'nexusui'
import Tone from 'tone'


export class NewSynth extends Component {

    constructor(props) {
        super(props)
        this.piano.on('change', event => {
            let note = event.note, on = event.state
            if(on && note === 84) this.triggerKeyPress('C5')  
            else if(on && note === 83) this.triggerKeyPress('B4')
            else if(on && note === 82) this.triggerKeyPress('Bb4')
            else if(on && note === 81) this.triggerKeyPress('A4')
            else if(on && note === 80) this.triggerKeyPress('Ab4')
            else if(on && note === 79) this.triggerKeyPress('G4')
            else if(on && note === 78) this.triggerKeyPress('Gb4')
            else if(on && note === 77) this.triggerKeyPress('F4')
            else if(on && note === 76) this.triggerKeyPress('E4')
            else if(on && note === 75) this.triggerKeyPress('Eb4')
            else if(on && note === 74) this.triggerKeyPress('D4')
            else if(on && note === 73) this.triggerKeyPress('Db4')
            else if(on && note === 72) this.triggerKeyPress('C4')
          })

          this.gain = new Tone.Gain(0.5).toMaster()
          this.synth = new Tone.Synth().connect(this.gain)
      
          this.piano = new Nexus.Piano('#target',{
              'size': [500,125],
              'mode': 'button',  // 'button', 'toggle', or 'impulse'
              'lowNote': 24,
              'highNote': 60
          })
    }

 
    piano = new Nexus.Piano('#target',{
        'size': [500,125],
        'mode': 'button',  // 'button', 'toggle', or 'impulse'
        'lowNote': 24,
        'highNote': 60
    })

    triggerKeyPress = note => {
        this.synth.triggerAttackRelease(note, '16n')
      }
      
    

    render() {
  
        return (
            <div id="target">
                
            </div>
        )
    }
}

export default NewSynth
