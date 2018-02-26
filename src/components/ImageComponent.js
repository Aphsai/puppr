import React from 'react';
export default class ImageComponent extends React.Component {

  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', width:this.props.dimension.width}}>

        <img
          onClick={this.props.openPreview}
          data-id={this.props.public_id}
          data-width={this.props.dbDimension.width}
          data-height={this.props.dbDimension.height}
          width={this.props.dimension.width}
          height={this.props.dimension.height}
          src={this.props.src}
        />
        <button
          data-id={this.props.public_id}
          onClick={this.props.handleFavourite}
          disabled={this.props.disabled}>
            Heart
        </button>
        <button onClick={this.props.handleVote}> Pat </button>

      </div>
    );
  }
}
