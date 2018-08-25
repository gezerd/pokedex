import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pokemon } from './pokemon.js';

export class Pokedex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			pokemon: [],
			showPokemon: false,
			pokemonId: 0
		};

		this.handleClick = this.handleClick.bind(this);
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

	handleClick(id, event) {
		this.setState({
			showPokemon: true,
			pokemonId: id
		});
	}

	getComponent() {
		const pokemon = this.state.pokemon;
		if (this.state.showPokemon) {
			return <Pokemon pokemonId={this.state.pokemonId} />;
		}
		else {
			return (
				pokemon.map(p => (
					<div id="pokedex_entry" key={p.id} onClick={this.handleClick.bind(this, p.id)}>
						<div id="center_img">
							<img src={"./img/gif/" + p.id + ".gif"} />
							<p id="pokemon_name">{p.name}</p>
						</div>
					</div>
				))
			);
		}
	}

	render() {
		const { error, isLoaded, pokemon } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <object type="image/svg+xml" data="./img/pokeball.svg"></object>;
		} else {
			return (
				this.getComponent()
			);
		}
	}
}

ReactDOM.render(
	<Pokedex />,
	document.getElementById('root')
);