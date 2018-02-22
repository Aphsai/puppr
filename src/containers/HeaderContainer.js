import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import { firebase, auth } from '../configs';
import { db } from '../configs/firebase';

export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      authUser: null,
      username: null,
    }
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? (
        this.retrieveUsername(authUser)
      )
      : this.setState(() => ({ authUser: null }));
    });
  }
  retrieveUsername = (authUser) => {
    db.ref('users/' + authUser.uid).once('value').then(snapshot => {
      this.setState({
        authUser: authUser,
        username: (snapshot.val() && snapshot.val().username) || null
      });
    });
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
  handleSignOut = (e) => {
    e.preventDefault();
    auth.doSignOut();
    this.setState({
      auth:null,
      authUser:null
    });
  }
  render() {
    if (!this.state.authUser) {
      return (
        <div>
          <button> Upload </button>
          <button onClick={this.toggleLogin}> Login </button>
          <button onClick={this.toggleSignup}> Signup </button>
          { this.state.auth == 'login'? <LoginContainer /> :
            this.state.auth == 'signup'? <SignupContainer /> : null
          }
        </div>
      );
    }
    else {
      return (
        <div>
          <button> Upload </button>
          <button> Favourites </button>
          <button onClick={this.handleSignOut}> Sign out </button>
          <label> {this.state.username} </label>
        </div>
      )
    }
  }
}
