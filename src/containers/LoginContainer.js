import React from 'react';
import firebase, { auth } from '../configs';


const INITIAL_STATE = {
  email: '',
  password: '',
};

export default class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
    .catch(error => {
      this.props.handleError(error.message)
    });
  }

  render () {
    const {
      email,
      password,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          placeholder='username or email'
          className="authenticationInputs"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          value={password}
          placeholder='password'
          className="authenticationInputs"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button disabled={isInvalid} type="submit">
          Login
        </button>
      </form>
    );
  }
}
