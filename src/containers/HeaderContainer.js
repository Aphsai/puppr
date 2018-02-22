import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';


export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      user: null
    }
  }
  toggleLogin = () => {
    if (this.state.auth != 'login') {
      this.setState({
        auth: 'login'
      });
    }
    else {
      this.setState({
        auth: null
      })
    }
  }
  toggleSignup = () => {
    if (this.state.auth != 'signup') {
      this.setState({
        auth: 'signup'
      });
    }
    else {
      this.setState({
        auth: null
      })
    }
  }
  assignUser = (username) => {
    this.setState({
      user: username
    });
  }
  render() {
    if (!this.state.user) {
      return (
        <div>
          <button> Upload </button>
          <button onClick={this.toggleLogin}> Login </button>
          <button onClick={this.toggleSignup}> Signup </button>
          { this.state.auth == 'login'? <LoginContainer assignUser={this.assignUser}/> :
            this.state.auth == 'signup'? <SignupContainer assignUser={this.assignUser}/> : null
          }
        </div>
      );
    }
    else {
      return (
        <div>
          <button> Upload </button>
          <button> Favourites </button>
          <label> {this.state.user} </label>
        </div>
      )
    }
  }
}
