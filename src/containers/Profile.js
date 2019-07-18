import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  state = {
    userSessions: []
  };

  componentDidMount() {
    console.log("componentDidMount: ");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate: ");
  }

  handleChange = e => {
    console.log("e: ", e.target.value);
    //    this.setState({
    //         singleArtWork: {
    //             ...this.state.singleArtWork,
    //             [e.target.name]: e.target.value
    //         }

    //     })
  };

  handleSubmit = e => {
    e.preventDefault();
    // fetch('http://localhost:3000/artworks', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //     },
    //     body: JSON.stringify(this.state.singleArtWork)
    // })
    //     .then(res => res.json())
    //     .then(resp => {
    //         this.setState({ artistWorks: [resp, ...this.state.artistWorks]})
    //         console.log("Newart", resp)
    //     })
  };

  render() {
    let sessions = this.props.currentUser.attributes.sessions.map(session => {
      return (
        <div className="card" key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </div>
      );;
    });

    return (
      <div>
        <h1>{this.props.currentUser.attributes.username}'s Profile</h1>
        <h2>Current Sessions</h2>
        {sessions}
      </div>
    );
  }
}

export default Profile;
