import React from 'react';
export default class ImageComponent extends React.Component {

  render() {
    // console.log(this.props.unheart + " " + this.props.public_id);
    // let
    return (
      <div className="imageContainer" style={{width:this.props.dimension.width}}>
        <img
          className="imageComponent"
          onClick={this.props.openPreview}
          data-id={this.props.public_id}
          data-width={this.props.dbDimension.width}
          data-height={this.props.dbDimension.height}
          width={this.props.dimension.width}
          height={this.props.dimension.height}
          src={this.props.src}
        />
        <button
          className="imageHeartButton">
            <img
              data-id={this.props.public_id}
              onClick={this.props.handleFavourite}
              src={"resources/" + (!this.props.unheart? (this.props.disabled? 'favourite_disable' : 'unfavourite') : 'favourite') + ".svg"}
              className='heart'
            />
        </button>
        <button
          className="imageLikeButton">
          <img
            data-id={this.props.public_id}
              onClick={this.props.handleVote}
            src={"resources/" + (!this.props.patted? (this.props.disabled? 'like_disable' : 'unliked') : 'like') + ".svg"}
            className="like"
          />
        </button>
        {this.props.delete? (
          <button onClick={this.props.handleDelete} className="imageDeleteButton" data-id={this.props.public_id}>
            <img
              data-id={this.props.public_id}
              onClick={this.props.handleFavourite}
              disabled={this.props.disabled}
              src="resources/delete.svg"
              className="delete"
            />
          </button>)
          : null}
          {/* {this.props.numPats} */}
      </div>
    );
  }
}
