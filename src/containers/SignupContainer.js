import React from 'react';
import firebase, { auth } from '../configs';

const INITIAL_STATE = {
  username : '',
  email: '',
  password: '',
  conf_password: '',
  error: null,
};

export default class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const {
      username,
      email,
      password,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({
          error: error
        });
      }, {
        this.props.assignUser(username);
      });
      e.preventDefault();

  }

  render() {

    const {
      username,
      email,
      password,
      conf_password,
      error,
    } = this.state;

    const isInvalid =
      password !== conf_password ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          placeholder='email' />
        <input
          value={username}
          placeholder='username'
          onChange={event => this.setState({ username: event.target.value })}
         />
        <input
          value={password}
          placeholder='password'
          onChange={event => this.setState({ password: event.target.value })}
        />
        <input
          value={conf_password}
          placeholder='confirm password'
          onChange={event => this.setState({ conf_password: event.target.value })}
        />
        <button disabled={isInvalid} type="Submit"> Sign Up </button>

        { error && <p>{error.message}</p>}
      </form>
    )
  }
}
