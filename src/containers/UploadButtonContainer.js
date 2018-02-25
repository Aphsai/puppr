import React from 'react';

export default class UploadButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  
  guidGenerator = () => {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }

  uploadFile = (e) => {
    var url = `https://api.cloudinary.com/v1_1/dl2zhlvci/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    var fileName = this.guidGenerator();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    fd.append('upload_preset', 'pupprupload');
    fd.append('file', e.target.files[0]);
    fd.append('public_id', fileName);
    if (this.props.authUser.uid) {
      this.props.addImageToUser(this.props.authUser.uid, fileName);
    }
    this.props.doCreateImage(fileName);
    xhr.send(fd);
  }

  render() {
    return (
      <div className="upload-button">
        <label className= "upload"> upload
          <input type="file" onChange={this.uploadFile}/>
        </label>
      </div>
    );
  }

}
