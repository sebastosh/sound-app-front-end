import React from 'react'
import { ActionCable } from 'react-actioncable-provider';


class Jam extends React.Component {

	state = {
		content: ""
	}

	sendMesssage = (event) => {
		fetch(`http://localhost:3000/jams/${this.props.jam.id}/add_message`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				content: this.state.content,
				user_id: 1
			})
		})
		.then(res => {
			this.setState({
				content: "",
			})
		})
	}

	handleChange = (event) => {
		this.setState({
			content: event.target.value
		})
	}

	handleSocketResponse = data => {

    switch (data.type) {
      case 'ADD_MESSAGE':
       		this.props.addMessage(data.payload)
       		break;
      case "DELETE_MESSAGE":
      		this.props.removeMessage(data.payload.message_id)
       		break;
      default:
        console.log(data);
    }
  };


  deleteMessage = (messageId) => {
  	fetch("http://localhost:3000/jams/delete_message", {
  		method: "POST",
  		headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				message_id: messageId,
				jam_id: this.props.jam.id
			})
  	})
  }

	render(){
		let messageComponents = this.props.jam.messages.map(message => {
			return(
				<p>
					{message.username} says: {message.content} 
					<button onClick={(event) => this.deleteMessage(message.id)}>DELETE</button>
				</p>

			)
		})
		return (
			<div>
				<ActionCable
          channel={{ channel: 'JamChannel', jam_id: this.props.jam.id }}
          onReceived={this.handleSocketResponse}
        />
				<h1>{this.props.jam.name}</h1>
				<textarea onChange={this.handleChange}/>
				<button onClick={this.sendMesssage} >Enter</button>
				{messageComponents}
				<button onClick={this.props.leaveRoom}>Go Back</button>
			</div>
		)
	}
}

export default Jam