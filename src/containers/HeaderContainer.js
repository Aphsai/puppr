import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import UploadButtonContainer from './UploadButtonContainer'
import { firebase, auth, db } from '../configs';

export default class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      authUser: null,
      user: null
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? (
        this.setUsername(authUser)
      )
      : this.setState(() => ({ authUser: null }));
    });
  }
  
  setUsername = (authUser) => {
    console.log(authUser);
    db.getSpecificUser(authUser.uid).then(snap => {
      console.log(snap.val());
      this.setState({
        authUser: authUser,
        user: snap.val()
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
        <div className= "header">
          <UploadButtonContainer
            uid={null}
          />
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
        <div className="header">
        <UploadButtonContainer
          uid={this.state.authUser.uid}
          addImageToUser={db.addImageToUser}
          doCreateImage={db.doCreateImage}
        />
        <button> Favourites </button>
        <button onClick={this.handleSignOut}> Sign out </button>
        <label> {this.state.user.username} </label>
        </div>
      )
    }
  }
}
