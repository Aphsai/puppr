import React from 'react';

import BoardComponent from '../components/BoardComponent'
import HeaderContainer from './HeaderContainer'

import firebase from '../configs/firebase';


export default class PupprApp extends React.Component {
  render() {

    return (
      <div className="container">
        <HeaderContainer />
        <BoardComponent />
      </div>
    );
  }
}
