import React from 'react';
import axios from 'axios';
import { db, auth, firebase } from '../configs';
import ImageComponent from '../components/ImageComponent';
import PreviewComponent from '../components/PreviewComponent';


export default class BoardContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gallery: [],
          authUser: null,
          previewOpen: false,
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
  handleFavourite = (e) => {
    if (this.state.authUser) {
      db.addFavouriteToUser(this.state.authUser.uid, e.target.dataset.id);
    }
  }
  clickImage = (e) => {
    if (!this.state.previewOpen) {
      this.setState({ previewOpen: {url: e.target.dataset.id, width: e.target.dataset.width, height: e.target.dataset.height} });
    } else {
      this.setState({ previewOpen: false });
    }
  }
  render() {
      if (!this.state.previewOpen) {
        console.log(this.state.previewOpen);
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
                openPreview={this.clickImage}
              />
            )}
          </div>
        );
    } else {
      console.log(this.state.previewOpen);
      return (
        <div style={{display:'flex', flexWrap:'wrap'}}>
          <PreviewComponent
            src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + this.state.previewOpen.url + '.jpg'}
            dbDimension={{width: this.state.previewOpen.width, height: this.state.previewOpen.height}}
            handleClick={this.clickImage} />

          <button onClick={this.clickImage}>leave</button>
        </div>
      );
    }
  }
}