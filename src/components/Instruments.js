
import React, { Component } from "react";

export class Instruments extends Component {
state = {
  clicked: false
}

pickInstrument = e => {
  console.log('this instrument', e.target.id);
  console.log('props',this.props.instrument);
  this.setState({clicked:!this.state.clicked})
  // this.props.setInstrument()
}
  render() {
   
   
    

    return (
      <div id={this.props.instrument.id} className={this.state.clicked ? "instrument-pick": "instrument"} onClick={this.pickInstrument}>
        {this.props.instrument.attributes.name}
        
      
      </div>
    );
  }
}

export default Instruments;
