import React, { Component } from 'react'

export class Message extends Component {
    render() {
        return (
            <div>
             {this.props.message.username}: {this.props.message.content} 
           
            </div>
        )
    }
}

export default Message