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
          user: null,
          previewOpen: false,
      }
  }
  componentDidMount() {
    db.getListOfImages().then(data => {
      let galleryData = [];
      data.forEach(element => {
        galleryData.push({
          public_id: element.val().public_id,
          width: element.val().width,
          height: element.val().height,
        });
      });
      this.setState({
        gallery: galleryData,
      });
    });

    db.getRefOfImages().on('child_added', data => {
      this.setState({
        gallery: this.state.gallery.concat({
          public_id: data.val().public_id,
          width: data.val().width,
          height: data.val().height,
        })
      });
    });

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
    console.log(this.props.user.favourites);
  }
  render() {
    console.log(this.props.user);
    if (!this.state.previewOpen) {
        return (
            <Masonry>
            {this.state.gallery.map(data =>
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
