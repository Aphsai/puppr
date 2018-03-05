import React from 'react'
export default class ErrorComponent extends React.Component {

	render() {
		return (
			<div className = "errorBox" style={{ zIndex: 9999 }} onClick={this.props.handleClick}>
				<h1>It seems like there were no good boys in your upload...</h1>
			</div>
		)
	}
}