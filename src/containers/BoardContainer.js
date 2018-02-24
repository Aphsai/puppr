import React from 'react';
import axios from 'axios';
import { db, auth } from '../configs';
import ImageComponent from '../components/ImageComponent';


export default class BoardContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gallery: [],
      }
  }

  componentDidMount() {
    axios.get('https://res.cloudinary.com/dl2zhlvci/image/list/dogs.json').then(res => {
      this.setState({gallery: res.data.resources});
    });
  }
  changeDimension = (height, width) => {
    width *= 300/height;
    height = 300;
    return {height:height, width:width}
  }
  handleFavourite = (e) => {
    let user = auth.isLogged();
    if (user) {
      db.addFavouriteToUser(user.uid, e.target.dataset.id);
    } else {
      console.log("YOU MUST BE SIGNED IN TO FAVOURITE");
    }
  }
  render() { 
    return (
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {this.state.gallery.map(data =>
          <ImageComponent
            src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}
            dimension={this.changeDimension(data.height, data.width)}
            dbDimension={{width: data.width, height:data.height}}
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
