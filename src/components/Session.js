import React, { Component } from 'react'
export class Session extends Component {
    render() {

    console.log('session:', this.props.session.name, this.props.session.id);
   
      


        return (
            
            <div className="card">
               <h3>{this.props.session.name}</h3>
             
                {/*{orgCall} */}
            </div>
        )
    }
}

export default Session
