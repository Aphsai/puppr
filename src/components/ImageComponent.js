import React from 'react';

export default class ImageComponent extends React.Component {




  render() {
    return (
      <div>

        <img width={this.props.dimension.width} height={this.props.dimension.height} src={this.props.src} />
        <button
          data-id={this.props.public_id}
          data-width={this.props.dbDimension.width}
          data-height={this.props.dbDimension.height}
          onClick={this.props.handleFavourite}>
            Heart
        </button>
        <button onClick={this.props.handleVote}> Pat </button>

      </div>
    );
  }
}
