import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Title extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="title_bar">
				<span>Pok&eacute;dex</span>
			</div>
		);
	}
}