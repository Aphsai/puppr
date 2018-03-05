import React from 'react';
import { db, auth } from '../configs';

const INITIAL_STATE = {
  username : '',
  email: '',
  password: '',
  conf_password: '',
};

export default class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.doCreateUser(authUser.uid, username, email)
          .catch(error => {
            this.props.handleError(error.message)
          });
      })
      .catch(error => {
          this.props.handleError(error.message)
      });

  }

  render() {

    const {
      username,
      email,
      password,
      conf_password,
    } = this.state;

    const isInvalid =
      password !== conf_password ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="signupForm">
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          placeholder='email'
          className="authenticationInputs"/>
        <input
          value={username}
          placeholder='username'
          onChange={event => this.setState({ username: event.target.value })}
          className="authenticationInputs"
         />
        <input
          value={password}
          placeholder='password'
          onChange={event => this.setState({ password: event.target.value })}
          className="authenticationInputs"
        />
        <input
          value={conf_password}
          placeholder='confirm password'
          onChange={event => this.setState({ conf_password: event.target.value })}
          className="authenticationInputs"
        />
        <button disabled={isInvalid} type="submit" className="authenticationButtons submitButton">
          Submit
        </button>
      </form>
    )
  }
}
