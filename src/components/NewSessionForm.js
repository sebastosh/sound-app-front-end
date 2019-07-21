import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

// import ReactDOM from "react-dom";

export class NewSessionForm extends Component {
  state = {
      instruments: {},
      name: '',
      user_id: '',
      instrument_id:''
  }

  static getDerivedStateFromProps(props, state) {
     console.log('props, state: ', props, state)
     fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(instrumentData => {
        this.getInstruments(instrumentData)
        console.log('instrumentData: ', instrumentData);
        this.setState({
          instruments: instrumentData
        });
        
      });
    
    
  }

  // componentWillMount() {
  //   fetch("http://localhost:3000/instruments")
  //     .then(response => response.json())
  //     .then(instrumentData => {
  //       console.log('instrumentData: ', instrumentData);
  //       this.setState({
  //         instruments: instrumentData
  //       });
  //     });
  // }


  handleSubmit = e => {
    e.preventDefault();

    let newSession = {
      name: this.state.name,
      user_id: this.state.user_id,
      instrument_id: this.state.instrument_id
  }
  console.log( 'newsession fetch',newSession );
debugger
    fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newSession)
    })
      .then(res => res.json())
      .then(this.props.history.push("/"));
  };

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  getInstruments = (instruments) => {
      console.log('there is fucking instruments here', instruments)
 
      //   let sessionInstrumentChoice = this.state.instruments.map(instrument => {
      //   return <div onClick={this.chooseInstrument}>{instrument.name}</div>})
      //   console.log('sessionInstrumentChoice: ', sessionInstrumentChoice);

      }

  render() {
    console.log('newformstate',this.state.instruments);

    // // let sessionInstrumentChoice
    
    // if (this.state.instruments === {}) {
    //   console.log('there is fucking instruments here'); }
    //   else {
    //     let sessionInstrumentChoice = this.state.instruments.map(instrument => {
    //     return <div onClick={this.chooseInstrument}>{instrument.name}</div>})
    //     console.log('sessionInstrumentChoice: ', sessionInstrumentChoice);
    //    }

     
    
 
      
   
    
    return (
        <form className="new-session-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
          />
          
          <input type="submit" value="New Session" />
          <NavLink to="/">❌</NavLink>
        </form>
   
  
    )
  }
}

export default NewSessionForm
