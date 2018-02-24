import React from 'react';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
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
  guidGenerator = () => {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
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
    db.getSpecificUser(authUser.uid).then(snap => {
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

  uploadFile = (e) => {
    var url = `https://api.cloudinary.com/v1_1/dl2zhlvci/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    var fileName = this.guidGenerator();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    fd.append('upload_preset', 'pupprupload');
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', e.target.files[0]);
    fd.append('public_id', fileName);
    if (this.state.authUser) {
      db.addImageToUser(this.state.authUser.uid, e.target.files[0].name);
    }
    db.doCreateImage(fileName);
    xhr.send(fd);
  }

  render() {
    if (!this.state.authUser) {
      return (
        <div>
          <input type="file" onChange={this.uploadFile}/>
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
          <input type="file" onChange={this.uploadFile}/>
          <button> Favourites </button>
          <button onClick={this.handleSignOut}> Sign out </button>
          <label> {this.state.user.username} </label>
        </div>
      )
    }
  }
}
