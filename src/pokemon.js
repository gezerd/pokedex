import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Pokemon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			pokemonInfo: []
		};
	}

	componentDidMount() {
		fetch("http://localhost:3000/pokemon/" + this.props.pokemonId)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						pokemonInfo: result
					});
				},
				// Note: it's important to handle errors here
		        // instead of a catch() block so that we don't swallow
		        // exceptions from actual bugs in components.
		        (error) => {
		          this.setState({
		            isLoaded: true,
		            error
		          });
		        }
			)
	}

	render() {
		const { error, isLoaded, pokemonInfo } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return <div>{pokemonInfo[0].name}</div>;
		}
	}
}