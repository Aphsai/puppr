import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import UploadButtonContainer from './UploadButtonContainer';
import { db } from '../configs';

export default class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null,
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

  handleSignOut = (e) => {
    e.preventDefault();
    this.props.handleSignOut(e);
    this.setState({
      auth:null,
    });
  }

  handleVisibilityFilter = (e) => {
    this.props.handleVisibilityFilter(e.target.dataset.id);
  }

  handleError = (error) => {
    console.log("HEADER")
    this.props.handleError(error);
  }

  render() {
    if (!this.props.authUser) {
      return (
        <div className= "header">
          <h1 className="pupprTitle"> Puppr </h1>
          <div className="uploadContainer">
            <UploadButtonContainer
              uid={null}
              doCreateImage={db.doCreateImage}
              handleError={this.handleError}
            />
          </div>
          <div className="authenticationButtonHolder">
            <button className="authenticationButtons" onClick={this.toggleLogin}> Login </button>
            <button className="authenticationButtons" onClick={this.toggleSignup}> Signup </button>
          </div>
          { this.state.auth == 'login'? <LoginContainer handleError={this.handleError} /> :
            this.state.auth == 'signup'? <SignupContainer handleError={this.handleError} /> : null
          }
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="header">
          <h1 className="pupprTitle"> Puppr </h1>
          <div className="uploadContainer">
            <UploadButtonContainer
              uid={this.props.authUser.uid}
              addImageToUser={db.addImageToUser}
              doCreateImage={db.doCreateImage}
              handleError={this.props.handleError}
            />

          </div>
          <div className="authenticationButtonHolder">
            <h1 className="username"> {this.props.username} </h1>
            <button className="authenticationButtons" onClick={this.handleSignOut}> Sign out </button>
          </div>
        </div>
      );
    }
  }
}
