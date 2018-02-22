import React from 'react';
import firebase, { auth } from '../configs';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
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
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.assignUser(email);
    })
    .catch(error => {
      this.setState({
        error: error
      });
    });
  }

  render () {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';


    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          placeholder='username or email'
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          value={password}
          placeholder='password'
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button disabled={isInvalid} type="submit">
          Login
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}
