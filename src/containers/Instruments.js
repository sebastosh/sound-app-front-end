
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
   
    let instruments = this.state.instruments.map(instrument => {
      return (
        <Instrument
          key={instrument.id}
          setInstrument={this.setInstrument}
          removeInstrument={this.removeInstrument}
          instrument={instrument}
        />
      );
    });
    

    return (
      <div >
        
      {instruments}
      </div>
    );
  }
}

export default Instruments;
