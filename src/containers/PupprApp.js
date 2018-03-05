import React from 'react';
import BoardContainer from './BoardContainer'
import HeaderContainer from './HeaderContainer'
import ErrorComponent from '../components/ErrorComponent';
import { firebase, auth, db } from '../configs';


export default class PupprApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      user: null,
      visibilityFilter: 'ALL',
      error: null
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setUsername(authUser)
      : this.setState(() => ({ authUser: null }));
    });
  }

  setUsername = (authUser) => {
    console.log("Signing in. ");
    db.getSpecificUser(authUser.uid).then(snap => {
      this.setState({
        authUser: authUser,
        user: snap.val()
      });
    });
  }

  handleSignOut = (e) => {
    e.preventDefault();
    auth.doSignOut();
    this.setState({
      authUser: null,
      user: null
    });
  }

  handleError = (error) => {
  	this.setState({
  		error: error
  	});
  	console.log(error);
  }

  handleClick = (e) => {
  	this.setState({
  		error: null
  	})
  }

  render() {
    return (
      <div className="appContainer">
        <HeaderContainer
          authUser={this.state.authUser}
          username={this.state.user?this.state.user.username:''}
          visibilityFilter={this.state.visibilityFilter}
          handleVisibilityFilter={this.handleVisibilityFilter}
          handleSignOut={this.handleSignOut}
          handleError={this.handleError}
         />
        <BoardContainer
          authUser={this.state.authUser}
          user={this.state.user}
          visibilityFilter={this.state.visibilityFilter}
         />
         {this.state.error && <ErrorComponent handleClick={this.handleClick}/>}
      </div>
    );
  }
}
