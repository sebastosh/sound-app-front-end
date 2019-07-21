import React, { Component } from 'react'


// import ReactDOM from "react-dom";

export class NewSessionForm extends Component {
  state = {
      name: '',
      user_id: '',
      instrument_id: 1
  }

  componentDidMount() {
    this.setState({user_id:this.props.currentUser.id})
    fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(instrumentData => {
        console.log('instrumentData: ', instrumentData);
      });
  }


  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(this.props.history.push("/"));
  };

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
        <form className="new-session-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
          />
          <input type="submit" value="New Session" />
          <button type="button" onClick={this.props.toggleHidden}>❌</button>
        </form>
   
  
    )
  }
}

export default NewSessionForm
