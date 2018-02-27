import React from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { db, auth, firebase } from '../configs';
import ImageComponent from '../components/ImageComponent';
import PreviewComponent from '../components/PreviewComponent';

export default class BoardContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gallery: [],
          favourites: [],
          uploaded: [],
          previewOpen: false,
      }
  }
  componentDidMount() {
    console.log("BoardContainer has mounted.");
    //Check if new child added
    db.getRefOfImages().on('child_added', data => {
      console.log("Adding child: " + data.key);
      let tempGal = this.state.gallery;
      let tempUp = this.state.uploaded;
      tempGal[data.key] = data.val();
      if (this.props.authUser) tempUp[data.key] = data.key;
      else tempUp = [];
      this.setState({
        gallery: tempGal,
        uploaded: tempUp
      });
    });
    console.log("AuthUser: " + this.props.authUser);
  }
  componentWillReceiveProps(newProps) {
    console.log("Receiving new props");
    if (newProps.authUser) {
      this.setState({
        favourites: newProps.user.favourites? newProps.user.favourites: [],
        uploaded: newProps.user.uploaded? newProps.user.uploaded: [],
      });
    }
    else {
      this.setState({
        favourites: [],
        uploaded: []
      })
    }
  }
  changeDimension = (height, width) => {
    height *= 300/width;
    width = 300;
    return {height:height, width:width}
  }
  handleFavourite = (e) => {
    console.log("Handling favourite");
    if (this.props.authUser) {
      if (!this.state.favourites[e.target.dataset.id]) {
        let tempFav = this.state.favourites?this.state.favourites:[];
        tempFav[e.target.dataset.id] = e.target.dataset.id;
        this.setState({
          favourites: tempFav
        });
        db.addFavouriteToUser(this.props.authUser.uid, e.target.dataset.id);
      }
      else {
        let tempFav = this.state.favourites;
        delete tempFav[e.target.dataset.id];
        this.setState({
          favourites: tempFav
        });
        db.destroyFavouriteFromUser(this.props.authUser.uid, e.target.dataset.id);
      }
    }
  }
  handleDelete = (e) => {
    console.log("Deleting Image");
    if (this.props.authUser) {
      let tempUp = this.state.uploaded;
      delete tempUp[e.target.dataset.id];
      let tempGal = this.state.gallery;
      delete tempGal[e.target.dataset.id];
      let tempFav = this.state.favourites;
      delete tempFav[e.target.dataset.id];
      this.setState({
        uploaded: tempUp,
        gallery: tempGal,
        favourites: tempFav
      });
      db.destroyImage(this.props.authUser.uid, e.target.dataset.id);
    }
  }
  clickImage = (e) => {
    console.log("Clicking image");
    if (!this.state.previewOpen) {
      this.setState({ previewOpen: {url: e.target.dataset.id, width: e.target.dataset.width, height: e.target.dataset.height} });
    } else {
      this.setState({ previewOpen: false });
    }
  }
  handleVisibilityFilter = (visibilityFilter) => {
    console.log("Handling visibility filter");
    switch (visibilityFilter) {
      case 'TIME':
        return Object.values(this.state.gallery);
      case 'FAVOURITES':
        return Object.values(this.state.gallery).filter(id => {
          console.log("Displaying favourites from visibility filter: " + this.state.favourites);
          let public_id = id.public_id;
          return Object.keys(this.state.favourites).includes(public_id);
      });
      case 'YOUR UPLOADS':
        return Object.values(this.state.gallery).filter(id => {
          let public_id = id.public_id;
          return Object.keys(this.state.uploaded).includes(public_id);
      });
      case 'PATS':
        return Object.values(this.state.gallery).sort((a, b) => {
          return a.upvote - b.upvote;
        });
      default:
        return Object.values(this.state.gallery);
    }
  }
  render() {
    // TODO add unheart button - Done
    // TODO add delete button to uploads
    console.log("Favourites: " + Object.keys(this.state.favourites));
    console.log("Uploaded: " + Object.keys(this.state.uploaded));
    console.log("Gallery: " + Object.keys(this.state.gallery));
    let visibleImages = this.handleVisibilityFilter(this.props.visibilityFilter);
    console.log(visibleImages);
    if (!this.state.previewOpen) {
        return (
            <Masonry>
            {visibleImages.map(data =>
              <ImageComponent
                src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}
                dimension={this.changeDimension(data.height, data.width)}
                dbDimension={{width: data.width, height:data.height}}
                disabled={!this.props.authUser}
                unheart={Object.keys(this.state.favourites).includes(data.public_id)}
                delete={Object.keys(this.state.uploaded).includes(data.public_id)}
                handleDelete={this.handleDelete}
                key={data.public_id}
                public_id={data.public_id}
                handleFavourite={this.handleFavourite}
                handleVote={this.handleVote}
                openPreview={this.clickImage}
              />
            )}
          </Masonry>
        );
    } else {
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
