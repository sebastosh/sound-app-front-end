import React, { Component } from 'react';
import JamList from '../components/JamList'
import Jam from '../components/Jam'


class App extends Component {

	state = {
		jams: [],
		openJam: null,
		name: ""
	}

	componentDidMount(){
		fetch('http://localhost:3000/jams')
		.then(res => res.json())
		.then(jams => {
			this.setState({
				jams: jams
			})
		})
	}

	createJam = () => {
		fetch(`http://localhost:3000/jams`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name
			})
		})
		.then(res => res.json())
		.then(jam => {
			this.setState({
				name: "",
				jams: [...this.state.jams, jam]
			})
		})
	}

	removeMessage = (messageId) => {
		let newMessages = this.state.openJam.messages.filter(message => message.id !== messageId)

		let newJam = {...this.state.openJam}

		newJam.messages = newMessages

		this.setState({
			openJam: newJam
		})

	}

	selectJam = (jamId) => {
		fetch(`http://localhost:3000/jams/${jamId}/authorize`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name
			})
		})
		.then(res => res.json())
		.then(jam => {
			this.setState({
				openJam: jam
			})
		})
	}
	handleChange = (event) => {
		this.setState({
			name: event.target.value
		})
	}

	leaveJam = () => {
		this.setState({
			openJam: null
		})
	}

	addMessage = (message) => {
		let copyChat = {...this.state.openJam}
		copyChat.messages.push(message)
		this.setState({
			openJam: copyChat
		})
	}



	render() {
		console.log(this.state)
		return (

			
			<div className="jams">
<h1>WAHT UP</h1>
				<input value={this.state.name} placeholder={this.state.name} onChange={this.handleChange}/>
				<button onClick={this.createJam} >Create Jam</button>
				{this.state.openJam ? <Jam removeMessage={this.removeMessage} addMessage={this.addMessage} leaveJam={this.leaveJam} jam={this.state.openJam}/> : <JamList jams={this.state.jams} selectJam={this.selectJam}/>}
			</div>
		);
	}
}

export default App;
