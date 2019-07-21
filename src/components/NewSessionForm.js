import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

// import ReactDOM from "react-dom";

export class NewSessionForm extends Component {
  state = {
      name: '',
      user_id: '',
      instrument_id:'',
      currentUser: {},
      instruments: []
  }

  componentDidMount(){
    console.log('componentDidMount');
      fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(instrumentData => {
        this.setState(
          { instruments: instrumentData.data },
            () => {                        //callback
              console.log('this.state', this.state) // Mustkeom
            }
      );
        
       })
      }

  handleSubmit = e => {
    e.preventDefault();

    let newSession = {
      name: this.state.name,
      user_id: this.state.user_id,
      instrument_id: this.state.instrument_id
  }
  console.log('03 newsession ready fetch', newSession );

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
        this.props.addSession(newSession)
        this.props.history.push("/")});
        
  };

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  setInstrument = instrument => {
    console.log(instrument.target.id);
 
    console.log('this.props.sessionUser: ', this.props.sessionUser.id);
    this.setState(
      { instrument_id: instrument.target.id,
      user_id: this.props.sessionUser.id
     },
        () => {                        //callback
          console.log('added instrument id', this.state) // Mustkeom
        }
  );
  }
  



  render() {
     
      let instruments = this.state.instruments.map(instrument => {
        return <div key={instrument.id} userId={instrument} id={instrument.id} className="new-instrument" onClick={this.setInstrument} >{instrument.attributes.name}</div>
      })

    return (
        <form className="new-session-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
          />
          {instruments}
          <input type="submit" value="New Session" />
          <NavLink to="/">❌</NavLink>
        </form>
   
  
    )
  }
}

export default NewSessionForm
