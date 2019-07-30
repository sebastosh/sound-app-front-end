import React, { Component } from "react";
import ReactDOM from "react-dom";

export class EditSessionForm extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.divFocus).focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateSessionName(this.state.name);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
   
        <form className="edit-session-form" onSubmit={this.handleSubmit}>
          <input
            ref="divFocus"
            tabIndex={1}
            type="text"
            value={this.state.name}
            placeholder={this.props.sessionName}
            onBlur={this.props.editSessionName}
            onChange={this.handleChange}
            name="name"
          />
        </form>
   
    );
  }
}

export default EditSessionForm;
