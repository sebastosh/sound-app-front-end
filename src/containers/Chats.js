import React, { Component } from 'react';
import ChatList from '../components/ChatList'
import Chat from '../components/Chat'


class Chats extends Component {

	state = {
		chats: [],
		openChat: null,
		name: ""
	}

	componentDidMount(){
		fetch('http://localhost:3000/chats')
		.then(res => res.json())
		.then(chats => {
			this.setState({
				chats: chats
			})
		})
	}

	createChat = () => {
		fetch(`http://localhost:3000/chats`, {
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
		.then(chat => {
			this.setState({
				name: chat.name,
				chats: [...this.state.chats, chat]
			})
		})
	}

	removeMessage = (messageId) => {
		let newMessages = this.state.openChat.messages.filter(message => message.id !== messageId)

		let newChat = {...this.state.openChat}

		newChat.messages = newMessages

		this.setState({
			openChat: newChat
		})

	}

	selectChat = (chatId) => {
		fetch(`http://localhost:3000/chats/${chatId}/authorize`, {
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
		.then(chat => {
			console.log('selectchat: ', chat);
			this.setState({
				openChat: chat,
				name: chat.name
		
			})
		})
	}
	handleChange = (event) => {
		this.setState({
			name: event.target.value
		})
	}

	leaveChat = () => {
		this.setState({
			openChat: null
		})
	}

	addMessage = (message) => {
		let copyChat = {...this.state.openChat}
		copyChat.messages.push(message)
		this.setState({
			openChat: copyChat
		})
	}



	render() {
		console.log('Chats state', this.state)
		console.log('Chats props', this.props)
		return (

			
			<div className="chats">
<h1>CHAT HI!</h1>
				{this.state.openChat ? <Chat removeMessage={this.removeMessage} addMessage={this.addMessage} leaveChat={this.leaveChat} chat={this.state.openChat} currentUser={this.props.currentUser}/> : <ChatList chats={this.state.chats} selectChat={this.selectChat}/>}
				
				{!this.state.openChat ? <form onSubmit={this.createChat} ><input placeholder="create a chat" onChange={this.handleChange}/></form> : null}
			</div>
		);
	}
}

export default Chats;
