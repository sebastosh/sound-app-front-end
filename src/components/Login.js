import React from "react";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("https://still-mountain-88882.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(parsedResponse => {
        if (parsedResponse.token) {
          localStorage.setItem("token", parsedResponse.token);

          fetch("https://still-mountain-88882.herokuapp.com/profile", {
            headers: { Authorization: localStorage.token }
          })
            .then(res => res.json())
            .then(profileInfo => {

              this.props.getUser(profileInfo);
              
              this.props.history.push("/");
            });
        } else {
        
          console.log("YO! didn't work, try agian");
        }
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    return (
      <div className="login-signup">
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="username"
          />

          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          />

          <input type="submit" value="Log in!" />
        </form>
      </div>
    );
  }
}

export default Login;
