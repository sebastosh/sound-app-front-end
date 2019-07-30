import React, { Component } from 'react'
import StepPlay from './Sequencer/StepPlay'

export class StepSequencer extends Component {
   state= {
       synthName: "",
       synthType: "",
       musicData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
      ]
    }

    componentWillReceiveProps(props) {
        this.setState({
          synthType: props.synthApi.instrument_type,
          synthName: props.synthApi.name
        });
    
        if (props.synthApi.settings !== null) {
          this.setState({
            musicData: props.synthApi.settings
          });
        }
      }

    saveSynth = () => {
        let synthFromState = {
          name: this.props.synthApi.name,
          settings: this.state.musicData
        };
    
        fetch(`http://localhost:3000/instruments/${this.props.synthApi.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(synthFromState)
          // body: {"settings": this.state.settings}
        })
          .then(res => res.json())
          .then(synthObject => {
            console.log("promised synth: ", synthObject);
            console.log("compared this.props.synthApi: ", this.props.synthApi);
          });
      };
      
    //   setTimeout(() => {
    //     audioScene()
    //   }, 0)
      
    //   setTimeout(
    //     function = () {
    //         audioScene()
    //     }
    //     .bind(this),
    //     3000
    // );
      
    //   function audioScene () {
    //     ReactDOM.render((
    //       <MusicBox data={musicData} />
    //     ), document.getElementById('js-app'))
    //   }

    render() {
        return (
            <div><div className="synth-title">{this.state.synthName}          <span
            role="img"
            aria-label="Save Synth"
            className="save-synth"
            onClick={this.saveSynth}
          >
            💾
          </span></div>

        <StepPlay data={this.state.musicData} />
        </div>
        )
    }
}

export default StepSequencer
