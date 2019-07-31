import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";
import Chat from "../components/Chat";
import { ActionCable } from 'react-actioncable-provider';


class Chats extends Component {
  state = {
    chats: [],
    openChat: null,
    name: "",
    content: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/chats")
      .then(res => res.json())
      .then(chats => {
        this.setState(
          {
            chats: chats
          },
          () => {
            let thisChat;
            thisChat = this.state.chats.find(
              chat => chat.name === this.props.sessionName
            );

            if (!thisChat) {
              console.log("No chats by this session name: ", thisChat);
              fetch(`http://localhost:3000/chats`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  name: this.props.sessionName
                })
              })
                .then(res => res.json())
                .then(chat => {
                  this.setState({
                    name: chat.name,
                    chats: [...this.state.chats, chat]
                    // openChat: chat
                  });
                  console.log("new chat id: ", chat.id);
                });
            } else {
              console.log("Chat by session name: ", thisChat);
              this.setState({
                name: thisChat.name,
                chats: [...this.state.chats, thisChat]
                // openChat: thisChat
              });
              // this.selectChat(thisChat.id);
              fetch(`http://localhost:3000/chats/${thisChat.id}/authorize`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  name: this.state.name
                })
              })
                .then(res => res.json())
                .then(chat => {
                  console.log("selected chat: ", chat);
                  this.setState({
                    openChat: chat,
                    name: chat.name
                  });
                });
            }
          }
        );
      });
  }

  removeMessage = messageId => {
    let newMessages = this.state.openChat.messages.filter(
      message => message.id !== messageId
    );

    let newChat = { ...this.state.openChat };

    newChat.messages = newMessages;

    this.setState({
      openChat: newChat
    });
  };

  addMessage = message => {
    let copyChat = { ...this.state.openChat };
    copyChat.messages.push(message);
    this.setState({
      openChat: copyChat
    });
  };

  handleChange = (e) => {
		console.log('e: ', e);
		this.setState({ [e.target.name]: e.target.value });
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

  	sendMesssage = (event) => {
	event.preventDefault()
	fetch(`http://localhost:3000/chats/${this.props.chat.id}/add_message`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			content: this.state.content,
			user_id: this.props.currentUser.id
		})
	})
	.then(res => {
		console.log('res: ', res);
		this.setState({
			content: "",
		})
	})
}


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


  render() {
let messageComponents
    if (!!this.state.openChat) {   
     messageComponents = this.state.openChat.messages.map(message => {
        return(
          <div key={message.id}>
            {message.username}: {message.content} 
            <button onClick={(event) => this.deleteMessage(message.id)}>DELETE</button>
          </div>  
        )
      })
    }

    return (
      <div className="chats">
        {this.state.openChat ? (
          <ActionCable
          channel={{ channel: 'ChatChannel', chat_id: this.state.openChat.id }}
          onReceived={this.handleSocketResponse}
        />		
				{messageComponents}
				<form onSubmit={this.sendMesssage} >
				<input type="text" value={this.state.content} onChange={this.handleChange} name="content"/>
				</form>
        ) : null}
      	<form onSubmit={this.sendMesssage} >
				<input type="text" value={this.state.content} onChange={this.handleChange} name="content"/>
				</form>
       
      </div>
    );
  }
}

export default withRouter(Chats);
