import React from 'react';

export default class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  render() {
    if (!this.state.user) {
    return (
      <div>
        <button> Upload </button>
        <button> Login </button>
      </div>
    );
    }
    else {
      return (
        <div>
          <button> Upload </button>
          <button> Favourites </button>
          <label> {this.state.user} </label>

        </div>
      )
    }
  }
}
