import React from 'react';
import axios from 'axios';

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


  // min width/height : 300px
  // max width/height : 500px

  // if height > 500, then multiply (500/height) onto width and vice versa for width

  changeDimension = (height, width) => {
    if (height > 500) {
      width *= 500/height;
      height = 500;
    } else if (width > 500) {
      height *= 500/width;
      width = 500;
    }
    return {height:height, width:width}
  }

  render() {
      console.log(this.state.gallery)
    return (
      <div>
        {this.state.gallery.map(data =>
          
            <img style={{width: this.changeDimension(data.height, data.width).width, height: this.changeDimension(data.height, data.width).height}} key={data.public_id} 
            src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}/>
        )}
      </div>
    );
  }
}
