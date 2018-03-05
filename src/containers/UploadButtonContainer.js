import React from 'react';
import { Clarifai, pupprClarifai } from '../configs/clarifai';

export default class UploadButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      displayString: 'Upload',
    }
  }

  guidGenerator = () => {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }

  uploadFile = (file) => {
    console.log("Uploading file.");
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
        loading: (e.loaded / e.total),
        displayString: "Dog."
      })
    });

    //check if finished uploading
    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState === 4) {
        console.log("Upload complete. Success");
        this.setState ({
          loading:0
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
        this.setState({
          displayString: 'Upload'
        });
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

  filterImage = (e) => {

    console.log("Checking for tags: " + Clarifai + pupprClarifai);
    var base64;
    var result;
    var isDog = false;

    var file = e.target.files[0];
    var reader = new FileReader();
    var that = this;
    if (file) {
      this.setState({
        displayString: '...Dog?'
      });
    }
    reader.onloadend = function() {
      result = reader.result;
      result = result.replace(/^data:image\/(.*);base64,/, '')

      pupprClarifai.models.predict(Clarifai.GENERAL_MODEL, {base64: result}).then(
      function(response) {
        console.log(response.outputs[0].data.concepts);

      for (var i = 0; i < 20; i++) {
         if (response.outputs[0].data.concepts[i].name == "dog" ||
            response.outputs[0].data.concepts[i].name == "dogs" ||
            response.outputs[0].data.concepts[i].name == "puppy" ||
            response.outputs[0].data.concepts[i].name == "puppies") {
            isDog = true;
            break;
         }
      }

      if (isDog) {
        that.uploadFile(file);
      } else {
        that.props.handleError("It seems like there were no good boys in your upload...")
        that.setState({
          displayString: 'Upload'
        });
      }

      },
      function(err) {
        console.error(err);
      }
    );
    }
    reader.readAsDataURL(file);
  }

  render() {
      return (
        <div className="upload-button">
            <label className= "upload"> {this.state.displayString}
                  <input type="file" onChange={this.filterImage}/>
              </label>
              <div
                className="loadingBar"
                style={{width:this.state.loading * 300, display:this.state.loading?'flex':'none'}}>
                {this.state.displayString}
              </div>
        </div>
      );
    }
}
