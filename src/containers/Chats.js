import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";
import { ActionCable } from "react-actioncable-provider";
import Message from "../components/Message";

class Chats extends Component {
  state = {
    chats: [],
    openChat: null,
    openChatMessages: [],
    name: "",
    content: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
                    chats: [...this.state.chats, chat],
                    openChat: chat,
                    openChatMessages: chat.messages
                  });
                  console.log("new chat id: ", chat.id);
                });
            } else {
              console.log("Chat by session name: ", thisChat);

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
                    openChatMessages: chat.messages,
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
    if (this.state.openChatMessages.some(chatMessage => chatMessage.id !== message.id)) {
      this.setState({
        openChatMessages: [...this.state.openChatMessages, message]
      });
    } 
   
    
  };

  // ACTIONCABLE
  sendMesssage = event => {
     event.preventDefault();
    //  if (this.state.openChatMessages.some(chatMessage => chatMessage.id !== message.id)) {
    //   this.setState({
    //     openChatMessages: [...this.state.openChatMessages, message]
    //   });
    // }
 

    // fetch(`http://localhost:3000/chats/${this.state.openChat.id}/add_message`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     content: this.state.content,
    //     user_id: this.props.currentUser.id
    //   })
    // }).then(res => {
    //   console.log("res: ", res);
    //   this.setState({
    //     content: ""
    //   });
    // });
  };

  deleteMessage = messageId => {
    fetch("http://localhost:3000/chats/delete_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        message_id: messageId,
        chat_id: this.props.chat.id
      })
    });
  };

  handleSocketResponse = data => {
    console.log('data: ', data);
    switch (data.type) {
      case "ADD_MESSAGE":
        this.addMessage(data.payload);
        break;
      case "DELETE_MESSAGE":
        this.removeMessage(data.payload.message_id);
        break;
      default:
        console.log(data);
    }
  };

  render() {
    function List(messages) {
      if (!messages) {
        return <p>Sorry, no chat.</p>;
      } else {
        return (
          <div>
            {messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        );
      }
    }

    return (
      <div className="chats">
        {!!this.state.openChat ? (
          <div>
            <ActionCable
              channel={{
                channel: "ChatChannel",
                chat_id: this.state.openChat.id
              }}
              onReceived={this.handleSocketResponse}
            />
            <h3>{this.state.openChat.name} - Chat</h3>
            {List(this.state.openChatMessages)}
            <form onSubmit={this.sendMesssage}>
              <input
                type="text"
                value={this.state.content}
                onChange={this.handleChange}
                name="content"
              />
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Chats);
