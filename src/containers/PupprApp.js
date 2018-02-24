import React from 'react';

import BoardContainer from './BoardContainer'
import HeaderContainer from './HeaderContainer'

import firebase from '../configs/firebase';


export default class PupprApp extends React.Component {
  render() {

    return (
      <div>
        <HeaderContainer />
        <BoardContainer />
      </div>
    );
  }
}
