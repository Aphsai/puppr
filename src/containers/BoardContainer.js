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
      this.user = newProps.user;
      db.getRefOfFavourites(newProps.authUser.uid).on('child_added', data => {
        this.user.favourites[data.key] = data.val();
      });
      db.getRefOfUploads(newProps.authUser.uid).on('child_added', data => {
        this.user.uploaded[data.key] = data.val();
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
      db.addFavouriteToUser(this.props.authUser.uid, e.target.dataset.id);
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
          return (this.user.favourites
          ? Object.values(this.user.favourites).includes(public_id)
          :  null);
      });
      case 'YOUR UPLOADS':
        return this.state.gallery.filter(id => {
          let public_id = id.public_id;
          return (this.user.uploaded
          ? Object.values(this.user.uploaded).includes(public_id)
          : null);
      });
      default:
        return this.state.gallery;
    }
  }
  render() {
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
