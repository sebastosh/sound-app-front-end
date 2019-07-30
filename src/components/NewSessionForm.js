import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

export class NewSessionForm extends Component {
  state = {
    name: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    let newSession = {
      name: this.state.name
    };
    console.log("newSession: ", newSession);

    fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newSession)
    })
      .then(res => res.json())
      .then(newSession => {
        console.log(newSession);
   
        console.log("this.props.sessionUser.id: ", this.props.sessionUser.id);
        
        const newUserSession = {
          name: `${this.props.sessionUser.attributes.username}-${newSession.name}`,
          session_id: newSession.id,
          user_id: this.props.sessionUser.id
        };
        console.log("newUserSession: ", newUserSession);
        fetch("http://localhost:3000/user_sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(newUserSession)
        })
          .then(res => res.json())
          .then(newUserSession => {
            console.log("newusersession return", newUserSession);
            this.props.addSession(newSession);
          });

      
        this.props.newClick();
        this.props.history.push(`/sessions/${newSession.id}`)
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  render() {


    return (
      <form className="new-session-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.name}
          placeholder="New Session"
          onChange={this.handleChange}
          name="name"
        />

        <input type="submit" value="New Session" />
        <NavLink to="/">
          <span
            onClick={this.props.newClick}
            role="img"
            aria-label="cross mark"
          >
            ❌
          </span>
        </NavLink>
      </form>
    );
  }
}

export default withRouter(NewSessionForm);
