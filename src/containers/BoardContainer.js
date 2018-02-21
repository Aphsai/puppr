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
      axios.get('http://res.cloudinary.com/dl2zhlvci/image/upload/v1519174862/sample.jpg')
          .then(res => {
              console.log(res.data.resources);
              this.setState({gallery: res.data.resources})
          })
  }

  render() {
  	console.log(this.state.gallery)
    return (
      <div>
      </div>
    );
  }
}