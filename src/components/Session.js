import React from "react";
import DuoSynth from './DuoSynth'
const API = "http://localhost:3000";

class Session extends React.Component {
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
      <DuoSynth />
      </div>
    );
  }
}

export default Session;
