import React, { Component } from 'react'
import Grid from './Grid'
import PlayTransport from './PlayTransport'
import Tone from "tone";

class StepPlay extends Component {
    state = {
      index: 0
    }
  
    constructor (props) {
      super(props)

    //   const drums = [
    //    'Open' new Tone.MembraneSynth().toMaster();,
    //    'Closed' new Tone.MembraneSynth().toMaster();,
    //   'Clap'  new Tone.MembraneSynth().toMaster();,
    //   'Kick': new Tone.MembraneSynth().toMaster();,
    // ]

      const keys = new Tone.Players({
        'A': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/292951/A1.[mp3|ogg]',
        'C#': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/292951/Cs2.[mp3|ogg]',
        'E': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/292951/E2.[mp3|ogg]',
        'F#': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/292951/Fs2.[mp3|ogg]'
      }, {
        fadeOut: '64n'
      }).toMaster()
      
      const noteNames = 'F# E C# A'.split(' ')
      this.loop = new Tone.Sequence((time, x) => {
        for (let y = 0; y < noteNames.length; y++) {
          if (this.props.data[y][x]) {
            keys.get(noteNames[y]).start(time, 0, '32n', 0)
          }
        }
        this.setState({index: x})
      }, [...new Array(16)].map((_, i) => i), '8n')
      Tone.Transport.start()
    }
  
    render () {
      return (
        <div className="grid">
          <Grid
              width={this.props.data[0].length}
              height={this.props.data.length}
              data={this.props.data}
              index={this.state.index}
          />
          <PlayTransport loop={this.loop} />

        </div>
      )
    }
  }

export default StepPlay


