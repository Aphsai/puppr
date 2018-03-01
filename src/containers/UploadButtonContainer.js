import React from 'react';
//import clarifai from '../configs';

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
    console.log("Uploading file.");
    let file = e.target.files[0];
    var url = `https://api.cloudinary.com/v1_1/dl2zhlvci/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    var fileName = this.guidGenerator();
    var fr = new FileReader;
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
      if (xhr.readyState === 4) {
        console.log("Upload complete. Success");
        this.setState ({
          loading:false
        });
        fr.readAsDataURL(file);
      }
    })
    fd.append('upload_preset', 'pupprupload');
    fd.append('file', file);
    fd.append('public_id', fileName);
    fr.onload = () => {
      let img = new Image;
      img.onload = () => {
        if (this.props.uid) {
          this.props.addImageToUser(this.props.uid, fileName);
        }
        this.props.doCreateImage(fileName, img.width, img.height);
      }
      img.src=fr.result;
    }
    xhr.send(fd);
    //
  }

  convertImage = (e) => {

    const Clarifai = require('clarifai');

    const pupprClarifai = new Clarifai.App({
      apiKey: 'faa73f6812fc403691acee8d9c897d32'
    });

    var base64;
    var result;

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      result = reader.result;
      console.log('RESULT', result);
      //base64 = result.target.result.replace(/^data:image\/(.*);base64,/, '')

      result = result.replace(/^data:image\/(.*);base64,/, '');

      pupprClarifai.models.predict(Clarifai.GENERAL_MODEL, {base64: result}).then(
      function(response) {
        console.log("1"); 
        console.log(response);
      },
      function(err) {
        console.log("12"); 
        console.error(err);
      }
    );
    }
    reader.readAsDataURL(file);

    // Clarifai
  }

  render() {

    return (
      <div className="upload-button">
          {!this.state.loading
            ?(<label className= "upload"> upload
                <input type="file" onChange={this.convertImage}/>
            </label>)
            :<div style={{height:'50px', width:this.state.loading * 300, backgroundColor:'#449B81', alignSelf:'flex-start', borderRadius:'5px'}}></div>
          }
      </div>
    );
  }

}
