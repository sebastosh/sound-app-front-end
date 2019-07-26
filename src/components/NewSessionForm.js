import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";
import Instrument from './Instruments'

// import ReactDOM from "react-dom";

export class NewSessionForm extends Component {
  state = {
      name: '',
      user_id: '',
      instrument_id:'',
      currentUser: {},
      instruments: [],
      selected: []
  }

  componentDidMount(){
      fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(instrumentData => {
        this.setState(
          { instruments: instrumentData.data },
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
        // this.props.history.push(`/sessions/${newSession.id}`)
        // this.props.addSession(newSession)
        this.props.newClick()
        });    
  };

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log('e.target.value: ', e.target.value);
  };

  setInstrument = instrument => {
    console.log('instrument: ', instrument);

    this.setState(
      { instrument_id: instrument.target.id,
      user_id: this.props.sessionUser.id,

     }
  );
  }

  render() {
     
      let instruments = this.state.instruments.map(instrument => {
        return <Instrument key={instrument.id} setInstrument={this.setInstrument} instrument={instrument} />
      })

    return (
        <form className="new-session-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            placeholder="New Session"
            onChange={this.handleChange}
            name="name"
          />
          {instruments}
          <input type="submit" value="New Session" />
          <NavLink to="/"><span onClick={this.props.newClick} role="img" aria-label="cross mark">❌</span></NavLink>
        </form>
   
  
    )
  }
}

export default withRouter(NewSessionForm)
