import React from 'react';
import firebase, { auth } from '../configs'

export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      auth: 'default'
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (e) => {
    // e.preventDefault();
    // switch (this.state.auth) {
    //   case 'login':
    //     console.log("alert");
    //     return (
          auth.doSignInWithEmailAndPassword(this._username.value, this._password.value).catch(function(error) {
            console.log(error);
          });
    //   case 'signup':
    //     return (
    //       // if (this._username.value == '' || !this.validateEmail(this._email.value) || this._password.value == '') {
    //       //   console.log ("ERROR");
    //       // }
    //       // // } else {
    //         auth.doCreateUserWithEmailAndPassword(this._email.value, this._password.value)
    //       // }
    //     );
    // }
    // auth.doCreateUserWithEmailAndPassword(this._email.value, this._password.value);
  }
  login = () => {
    if (this.state.auth != 'login') {
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
    if (this.state.auth != 'signup') {
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
            <input placeholder='username'
              ref={(username) => {this._username = username}}/>
            <input placeholder='password' type='password'
              ref={(password) => {this._password = password; }}/>
            <button onClick={this.onSubmit}> Submit </button>
          </div>
        );
      case 'signup':
        return (
          <div>
            <input placeholder="email"
              ref={(email) => {this._email = email; }}/>
            <input placeholder='username'
              ref={(username) => {this._username = username}}/>
            <input placeholder='password'
              ref={(password) => {this._password = password; }}
              type='password' />
            <input placeholder='confirm password'
              ref={(password) => {this._confirmPassword = password; }}
              type='password'/>
            <button onClick={this.onSubmit}> Submit </button>
          </div>
        );
      default:
        return;
    }

  }


  render() {
    let authInputs = this.getInputs();
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
