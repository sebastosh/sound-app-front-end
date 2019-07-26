import React from 'react'

class ChatList extends React.Component {

	render(){
		return this.props.chats.map(chat => {
			return (
				<li key={chat.id} onClick={()=> this.props.selectChat(chat.id)}>
					{chat.name}
				</li>

			)
		})
	}
}

export default ChatList