import React from 'react';

 class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

   handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(parsedResponse => {
        
        if (parsedResponse.token) {
          localStorage.setItem('token', parsedResponse.token)
          
            fetch('http://localhost:3000/profile', {
              headers: { Authorization: localStorage.token }
            })
            .then(res => res.json())
            .then(profileInfo => {
              this.props.getUser(profileInfo)
              this.props.history.push('/profile')
            })
          
        } else {
          //handle error, ex. show user something like, alert()
          console.log("YO! didn't work, try agian");
        }
      })
  }

   handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

   render() {
    // console.log(this.state)
    return (
      <div>
      I am login page
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={this.handleChange} name="username" />
      {/* loggedInUser  <input type="email" value={this.state.email} onChange={this.handleChange} name="email" /> */}
        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
        <input type="submit" value="Log in!" />
      </form>
      </div>
    );
  }
}

 export default Login;