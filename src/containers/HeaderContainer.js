import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import UploadButtonContainer from './UploadButtonContainer'
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

  render() {
    if (!this.props.authUser) {
      return (
        <div className= "header">
          <UploadButtonContainer
            uid={null}
            doCreateImage={db.doCreateImage}
          />
          <button onClick={this.handleVisibilityFilter} data-id='TIME'> Date </button>
          <button onClick={this.handleVisibilityFilter} data-id='PATS'> Pats </button>
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
          uid={this.props.authUser.uid}
          addImageToUser={db.addImageToUser}
          doCreateImage={db.doCreateImage}
        />
        <button onClick={this.handleVisibilityFilter} data-id='TIME'> Date </button>
        <button onClick={this.handleVisibilityFilter} data-id='FAVOURITES'> Favourites </button>
        <button onClick={this.handleVisibilityFilter} data-id='YOUR UPLOADS'> Uploads </button>
        <button onClick={this.handleVisibilityFilter} data-id='PATS'> Pats </button>
        <button onClick={this.handleSignOut}> Sign out </button>
        <label> {this.props.username} </label>
        </div>
      );
    }
  }
}
