import React, { Component } from 'react'
import Tone from 'tone'
import Key from './Key'

export class Keys extends Component {
	constructor(props) {
		super(props);

		// tone.js build
		this.synth = new Tone.Synth().toMaster();
		this.vol = new Tone.Volume(0);
		this.synth.chain(this.vol, Tone.Master);

		// bindings
		this.onDownKey = this.onDownKey.bind(this);
		this.onUpKey = this.onUpKey.bind(this);
	}

	onDownKey(note) {
		console.log(`${note} played`);
		this.synth.triggerAttack(note);
	}

	onUpKey(note) {
		this.synth.triggerRelease();
	}

	render() {
		return (
			<div className="Keys">
				<Key
					note={`C${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`Db${this.props.octave}`}
					keyColor="black"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`D${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`Eb${this.props.octave}`}
					keyColor="black"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`E${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`F${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`Gb${this.props.octave}`}
					keyColor="black"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`G${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`Ab${this.props.octave}`}
					keyColor="black"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`A${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`Bb${this.props.octave}`}
					keyColor="black"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
				<Key
					note={`B${this.props.octave}`}
					keyColor="white"
					onDown={this.onDownKey}
					onUp={this.onUpKey}
				/>
			</div>
		);
	}
}

export default Keys
