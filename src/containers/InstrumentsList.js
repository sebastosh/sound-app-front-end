
import React, { Component } from "react";

export class Instruments extends Component {
state = {
  clicked: false
}

pickInstrument = e => {
  console.log('this instrument', e.target.id);
  console.log('props',this.props.instrument);
  this.setState({clicked:!this.state.clicked})
  !this.state.clicked ? this.props.setInstrument(this.props.instrument) : this.props.removeInstrument(this.props.instrument)
  
}
  render() {
   
   
    

    return (
      <div id={this.props.instrument.id} className={this.state.clicked ? "instrument-pick": "instrument"} onClick={this.pickInstrument}>
        {this.props.instrument.attributes.instrument_type}
        
      
      </div>
    );
  }
}

export default Instruments;
