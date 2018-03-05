import React from 'react';

export default class ErrorComponent extends React.Component {

	componentDidMount() {
		setTimeout(this.props.removeError, 2000);
	}
	render() {

		return (
			<div className = "errorBox errorBox-fadingOut">
				<h1>{this.props.message}</h1>
			</div>
		)
	}
}