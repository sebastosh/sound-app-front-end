import React from 'react'
import { ActionCable } from 'react-actioncable-provider';


class Chat extends React.Component {

	state = {
		content: ""
	}

	sendMesssage = (event) => {
		fetch(`http://localhost:3000/chats/${this.props.chat.id}/add_message`, {
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
  	fetch("http://localhost:3000/chats/delete_message", {
  		method: "POST",
  		headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				message_id: messageId,
				chat_id: this.props.chat.id
			})
  	})
  }

	render(){
		let messageComponents = this.props.chat.messages.map(message => {
			return(
				<div key={message.id}>
					{message.username} says: {message.content} 
					<button onClick={(event) => this.deleteMessage(message.id)}>DELETE</button>
				</div>

			)
		})
		return (
			<div>
				<ActionCable
          channel={{ channel: 'ChatChannel', chat_id: this.props.chat.id }}
          onReceived={this.handleSocketResponse}
        />
				<h1>{this.props.chat.name}</h1>
				<textarea onChange={this.handleChange}/>
				<button onClick={this.sendMesssage} >Enter</button>
				{messageComponents}
				<button onClick={this.props.leaveRoom}>Go Back</button>
			</div>
		)
	}
}

export default Chat