import React, { Component } from 'react'
import ReactDOM from "react-dom";
import MusicBox from './MusicBox'

export class StepSequencer extends Component {
    musicData = [
        [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
      ]
      
    //   setTimeout(() => {
    //     audioScene()
    //   }, 0)
      
    //   setTimeout(
    //     function = () {
    //         audioScene()
    //     }
    //     .bind(this),
    //     3000
    // );
      
    //   function audioScene () {
    //     ReactDOM.render((
    //       <MusicBox data={musicData} />
    //     ), document.getElementById('js-app'))
    //   }

    render() {
        return (
         
             
               <MusicBox data={this.musicData} />
         
        )
    }
}

export default StepSequencer
