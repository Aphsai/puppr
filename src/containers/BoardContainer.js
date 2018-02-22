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

  render() {
      console.log(this.state.gallery)
    return (
      <div>
        {this.state.gallery.map(data =>
          <img style={{width: '300px', height: '300px'}} key={data.public_id} src={'http://res.cloudinary.com/dl2zhlvci/image/upload/v1519264049/' + data.public_id + '.jpg'}/>
        )}
      </div>
    );
  }
}
