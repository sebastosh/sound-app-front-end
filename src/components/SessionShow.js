import React from "react";
import Draggable from 'react-draggable';
const API = "http://localhost:3000";

class SessionShow extends React.Component {
  state = {
    apply: false,
    data: []
  };

  componentDidMount() {
    const USER = this.props.match.url;

    fetch(API + USER)
      .then(response => response.json())
      .then(session => this.setState({ data: session.data.attributes }));
  }

  handleApply = () => {
    this.setState({
      apply: true
    });
  };

  handleCancel = () => {
    this.setState({
      apply: false
    });
  };
  render() {
    return (
      <div className="session">
        <h1>{this.state.data.name}</h1>
        <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
        {/* <ul>
          <li>{this.props.calls[this.props.match.params.callsId].attributes.description}</li>
          <li>{this.props.calls[this.props.match.params.callsId].attributes.medium}</li>
          <li>Deadline: {this.props.calls[this.props.match.params.callsId].attributes.deadline }</li>
        </ul>
        {this.state.apply ? <Form currentArtist={this.props.currentArtist} callId={this.props.match.params.callsId} handleCancel={this.handleCancel}/> : null}
        {this.state.apply ? null  : <button onClick={this.handleApply}>Apply</button>}
        */}

        {/* {this.state.apply ? null : <button>Organization Info</button>} */}
      </div>
    );
  }
}

export default SessionShow;
