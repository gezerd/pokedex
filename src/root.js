import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Title } from './title.js';
import { Pokedex } from './pokedex.js';

class Root extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Title /><Pokedex />
			</div>
		);
	}
}

ReactDOM.render(
	<Root />,
	document.getElementById('root')
);