import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";
import Chat from "../components/Chat";

class Chats extends Component {
  state = {
    chats: [],
    openChat: null,
    name: ""
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
                name: thisChat.name
                // openChat: thisChat
              });
              this.selectChat(thisChat.id);
            }

            // this.setState({
            //   currentUser: thisChat,
            //   userSessions: thisChat.attributes.sessions
            // });
          }
        );
      });
  }

  createChat = () => {
    fetch(`http://localhost:3000/chats`, {
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
        this.setState({
          name: chat.name,
          chats: [...this.state.chats, chat]
        });
      });
  };

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

  selectChat = chatId => {
    fetch(`http://localhost:3000/chats/${chatId}/authorize`, {
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
  };

  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  leaveChat = () => {
    this.setState({
      openChat: null
    });
  };

  addMessage = message => {
    let copyChat = { ...this.state.openChat };
    copyChat.messages.push(message);
    this.setState({
      openChat: copyChat
    });
  };

  render() {
    return (
      <div className="chats">
        {this.state.openChat ? (
          <Chat
            removeMessage={this.removeMessage}
            addMessage={this.addMessage}
            leaveChat={this.leaveChat}
            chat={this.state.openChat}
            currentUser={this.props.currentUser}
          />
        ) : null}

        {!this.state.openChat ? (
          <form onSubmit={this.createChat}>
            <input placeholder="create a chat" onChange={this.handleChange} />
          </form>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Chats);
