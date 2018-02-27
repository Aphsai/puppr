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
      this.user = [];
  }
  componentDidMount() {
    console.log("BoardContainer has mounted.");
    //Get current gallery
    db.getListOfImages().then(data => {
      let galleryData = [];
      data.forEach(element => {
        galleryData.push({
          public_id: element.val().public_id,
          width: element.val().width,
          height: element.val().height,
        });;
      });
      console.log("Retrieving data");
      this.setState({
        gallery: galleryData,
      });
    });
    //Check if new child added
    db.getRefOfImages().on('child_added', data => {
      this.setState({
        gallery: this.state.gallery.concat({
          public_id: data.val().public_id,
          width: data.val().width,
          height: data.val().height,
        })
      });
    });
    console.log("AuthUser: " + this.props.authUser);

  }
  componentWillReceiveProps(newProps) {
    if (newProps.authUser) {
      this.setState({
        favourites: newProps.user.favourites? newProps.user.favourites: [],
        uploaded: newProps.user.uploaded? newProps.user.uploaded: [],
      });
      console.log(newProps.user);
      // db.getRefOfFavourites(newProps.authUser.uid).on('child_added', data => {
      //   let tempFav = this.state.favourites;
      //   tempFav[data.key] = data.val();
      //   this.setState({
      //     favourites: tempFav
      //   });
      // });
      db.getRefOfUploads(newProps.authUser.uid).on('child_added', data => {
        let tempFav = this.state.uploaded;
        tempFav[data.key] = data.val();
        this.setState({
          uploaded: tempFav
        });
      });
    }
  }
  changeDimension = (height, width) => {
    height *= 300/width;
    width = 300;
    return {height:height, width:width}
  }
  handleFavourite = (e) => {
    if (this.props.authUser) {
      if (!this.state.favourites[e.target.dataset.id]) {
        let tempFav = this.state.favourites;
        tempFav[e.target.dataset.id] = {public_id: e.target.dataset.id}
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
  clickImage = (e) => {
    if (!this.state.previewOpen) {
      this.setState({ previewOpen: {url: e.target.dataset.id, width: e.target.dataset.width, height: e.target.dataset.height} });
    } else {
      this.setState({ previewOpen: false });
    }
  }
  handleVisibilityFilter = (visibilityFilter) => {
    switch (visibilityFilter) {
      case 'TIME':
        return this.state.gallery;
      case 'FAVOURITES':
        return this.state.gallery.filter(id => {
          let public_id = id.public_id;
          return Object.keys(this.state.favourites).includes(public_id);
      });
      case 'YOUR UPLOADS':
        return this.state.gallery.filter(id => {
          let public_id = id.public_id;
          return Object.keys(this.state.uploaded).includes(public_id);
      });
      default:
        return this.state.gallery;
    }
  }
  render() {
    // TODO add unheart button - IN PROGRESS
    // TODO add delete button to uploads
    console.log("Favourites: " + Object.keys(this.state.favourites));
    console.log("Uploaded: " + Object.keys(this.state.uploaded));
    let visibleImages = this.handleVisibilityFilter(this.props.visibilityFilter);

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
