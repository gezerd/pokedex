//import React, { Component } from 'react';

class Pokedex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			pokemon: []
		};
	}

	componentDidMount() {
		fetch("http://localhost:3000/pokedex")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						pokemon: result
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
		const { error, isLoaded, pokemon } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{pokemon.map(p => (
						<li key={p.name}>
							{p.name} {p.type1}
						</li>
					))}
				</ul>
			);
		}
	}
}

ReactDOM.render(
	<Pokedex />,
	document.getElementById('root')
);