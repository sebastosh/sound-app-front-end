import React, { Component } from 'react'
import Keys from './Piano/Keys'
import Octaves from './Piano/Octaves'


export class BassSynth extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
			octave: 1,
		}
		this.handleClickOctave = this.handleClickOctave.bind(this);
	}
    
    handleClickOctave(action) {
		switch(action) {
			case 'minus': this.setState({octave: this.state.octave - 1});
				break;
			case 'plus': this.setState({octave: this.state.octave + 1});
				break;
			default: this.setState({octave: 1});
				break;
		}
	}
	render() {
		return (
			<div className="synth">
                <h2>Bass Synth</h2>
				<Keys octave={this.state.octave}/>
				<Octaves octave={this.state.octave} handleClick={this.handleClickOctave}/>
			</div>
		);
	}
}


export default BassSynth

