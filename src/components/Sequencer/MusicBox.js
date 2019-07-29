import React, { Component } from 'react'
import ScorePlot from './ScorePlot'
import PlayButton from './PlayButton'
import ReactDOM from "react-dom";
import Tone from "tone";

class MusicBox extends Component {
    state = {
      index: 0
    }
  
    constructor (props) {
      super(props)
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
      }, [...new Array(16)].map((_, i) => i), '16n')
      Tone.Transport.start()
    }
  
    render () {
      return (
        <div className="grid">
          <ScorePlot
              width={this.props.data[0].length}
              height={this.props.data.length}
              data={this.props.data}
              index={this.state.index}
          />
          <PlayButton loop={this.loop} />
        </div>
      )
    }
  }

export default MusicBox


