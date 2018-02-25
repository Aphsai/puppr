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
    console.log("functioning?");
    var url = `https://api.cloudinary.com/v1_1/dl2zhlvci/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    var fileName = this.guidGenerator();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    //update progress bar
    xhr.upload.addEventListener("progress", (e) => {
      this.setState({
        loading: Math.round((e.loaded * 100.0) / e.total)
      })
    });

    //check if finished uploading
    xhr.addEventListener("readystatechange", (e) => {
      console.log(xhr.readyState);
      if (xhr.readyState === 4) {
        this.setState ({
          loading:false
        });
      }
    })
    fd.append('upload_preset', 'pupprupload');
    fd.append('file', e.target.files[0]);
    fd.append('public_id', fileName);
    xhr.send(fd);
    if (this.props.uid) {
      this.props.addImageToUser(this.props.uid, fileName);
    }
    this.props.doCreateImage(fileName);
  }

  render() {
    return (
      <div className="upload-button">
          {!this.state.loading
            ?(<label className= "upload"> upload
                <input type="file" onChange={this.uploadFile}/>
            </label>)
            :<div style={{height:'10px', width:this.state.loading, backgroundColor:'red'}}></div>
          }
      </div>
    );
  }

}
