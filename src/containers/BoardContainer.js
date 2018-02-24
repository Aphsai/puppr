import React from 'react';
import axios from 'axios';
import { db, auth, firebase } from '../configs';
import ImageComponent from '../components/ImageComponent';


export default class BoardContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gallery: [],
          authUser: null,
      }
  }

  componentDidMount() {
    axios.get('https://res.cloudinary.com/dl2zhlvci/image/list/dogs.json').then(res => {
      this.setState({gallery: res.data.resources});
    });
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? (
        this.setState(() => ({ authUser: authUser }))
      )
      : this.setState(() => ({ authUser: null }));
    });
  }
  changeDimension = (height, width) => {
    width *= 300/height;
    height = 300;
    return {height:height, width:width}
  }
  handleFavourite = (public_id) => {
    if (this.state.authUser)
    db.addFavouriteToUser(this.state.authUser.uid, public_id);
  }
  render() {
    return (
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {this.state.gallery.map(data =>
          <ImageComponent
            src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}
            dimension={this.changeDimension(data.height, data.width)}
            dbDimension={{width: data.width, height:data.height}}
            disabled={!this.state.authUser}
            key={data.public_id}
            public_id={data.public_id}
            handleFavourite={this.handleFavourite}
            handleVote={this.handleVote}
          />
        )}
      </div>
    );
  }
}
