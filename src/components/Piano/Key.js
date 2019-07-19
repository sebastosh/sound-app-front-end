import React, { Component } from 'react'

export class Key extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		};

		this.clickedMouse = this.clickedMouse.bind(this);
		this.unClickedMouse = this.unClickedMouse.bind(this);
	}

	clickedMouse(e) {
		this.setState({ clicked: true });
		this.props.onDown(this.props.note);
	}
	unClickedMouse(e) {
		this.setState({ clicked: false });
		this.props.onUp(this.props.note);
	}

	render() {
		const { keyColor } = this.props;
		return (
			<div
				className={`Key ${keyColor} ${this.state.clicked ? "active" : ""}`}
				onMouseUp={this.unClickedMouse}
				onMouseDown={this.clickedMouse}
			/>
		);
	}
}

export default Key
