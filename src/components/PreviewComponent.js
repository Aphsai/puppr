import React from 'react';
import LightBox from 'react-image-lightbox';
export default class PreviewComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
		}
	}

	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	dimension = (width, height) => {
		if (width > this.state.width) {
			height *= (0.6 * this.state.width)/width;	
			width = 0.6 * this.state.width;
		}
		if (height > this.state.height) {
			width *= (0.8 * this.state.height)/height;
			height = 0.8 * this.state.height;
		}

		return {width: width, height: height}
	}

	render() {
		let dimension = this.dimension(this.props.dbDimension.width, this.props.dbDimension.height);
		return (
			<LightBox className="preview"
				width={dimension.width} 
				height={dimension.height} 
				mainSrc={this.props.src}
				onCloseRequest={this.props.handleClick}
			/>

		);
	}
}