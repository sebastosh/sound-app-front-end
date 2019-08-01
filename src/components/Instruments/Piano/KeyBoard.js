import React, { Component } from 'react'
import Key from "./Key";
import Octaves from "./Octaves";

export class KeyBoard extends Component {

    render() {
        return (
            <div>
            <div className="Keys">
            <Key
              note={`C${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`Db${this.props.octave}`}
              keyColor="black"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`D${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`Eb${this.props.octave}`}
              keyColor="black"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`E${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`F${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`Gb${this.props.octave}`}
              keyColor="black"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`G${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`Ab${this.props.octave}`}
              keyColor="black"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`A${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`Bb${this.props.octave}`}
              keyColor="black"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
            <Key
              note={`B${this.props.octave}`}
              keyColor="white"
              onDown={this.props.onDownKey}
              onUp={this.props.onUpKey}
            />
          </div>
          <Octaves
            octave={this.props.octave}
            handleClick={this.props.handleClickOctave}
          />
          </div>
        )
    }
}

export default KeyBoard
