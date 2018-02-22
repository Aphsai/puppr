import React from 'react';
import firebase, { auth } from '../configs';

export default class LoginContainer extends React.Component {



  render () {
    return (
      <div>
        <input placeholder='username or email' />
        <input placeholder='password' type='password' />
      </div>
    );
  }
}
