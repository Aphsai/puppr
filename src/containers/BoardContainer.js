import React from 'react';
import axios from 'axios';
import { db } from '../configs';
import ImageComponent from '../components/ImageComponent';


export default class BoardContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gallery: []
      }
  }

  componentDidMount() {
    axios.get('https://res.cloudinary.com/dl2zhlvci/image/list/dogs.json').then(res => {
      console.log(res.data.resources);
      this.setState({gallery: res.data.resources});
    });
  }
  changeDimension = (height, width) => {
    if (height > width) {
      width *= 300/height;
      height = 300;
    }
    else {
      height *= 300/width;
      width = 300;
    }
    return {height:height, width:width}
  }
  handleFavourite = (e) => {
    let img_id = e.target.dataset.id;
    console.log(img_id);
  }
  render() {
      console.log(this.state.gallery)
    return (
      <div>
        {this.state.gallery.map(data =>
          <ImageComponent
            src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}
            dimension={this.changeDimension(data.height, data.width)}
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
