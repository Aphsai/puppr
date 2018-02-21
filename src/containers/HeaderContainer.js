import React from 'react';
import firebase from '../configs/firebase'

export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      auth: 'default'
    }
  }

  login = () => {
    if (this.state.authState == 'default') {
      this.setState({
        auth: 'login'
      });
    }
    else {
      this.setState({
        auth: 'default'
      })
    }
  }

  signup = () => {
    if (this.state.authState == 'default') {
      this.setState({
        auth: 'signup'
      });
    }
    else {
      this.setState({
        auth: 'default'
      })
    }
  }

  getInputs = () => {
    switch (this.state.auth) {
      case 'default':
        return;
      case 'login':
        return (
          <div>
            <input placeholder='username'/>
            <input placeholder='password'/>
          </div>
        );
      case 'signup':
        return (
          <div>
            <input placeholder='username' />
            <input placehodler='password' />
            <input placeholder='confirm password' />
          </div>
        );
      default:
        return;
    }

  }


  render() {
    let authInputs = this.getInputs();
    console.log(this.state.authState);
    console.log(authInputs);
    if (!this.state.user) {
      return (
        <div>
          <button> Upload </button>
          <button onClick={this.login}> Login </button>
          <button onClick={this.signup}> Signup </button>
          { authInputs }
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
