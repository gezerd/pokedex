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
			pokemonId: 0,
			search: '',
			typeSearch: ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.updateTypeSearch = this.updateTypeSearch.bind(this);
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

	updateSearch(event) {
		this.setState({
			search: event.target.value
		});
	}

	updateTypeSearch(event) {
		this.setState({
			typeSearch: event.target.value
		});
	}

	getComponent() {
		const pokemon = this.state.pokemon.filter(
			(p) => {
				return p.name.toLowerCase().indexOf(this.state.search) == 0;
			}
		).filter(
			(p) => {
				return (p.type1.indexOf(this.state.typeSearch) == 0) || (p.type2.indexOf(this.state.typeSearch) == 0);
			}
		);

		const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

		if (this.state.showPokemon) {
			return <Pokemon pokemonId={this.state.pokemonId} />;
		}
		else {
			return (
				<div>
					<div id="sidebar">
						<p className="sidebar_title">Search by Name</p>
						<input id="search_bar" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
						<div id="type_search_container">
							<p className="sidebar_title">Search by Type</p>
							{types.map(type => {
								if (type === this.state.typeSearch) {
									return (
										<button className={"search_button active_type " + type.toLowerCase()} key={type.toLowerCase()} value={type} onClick={this.updateTypeSearch.bind(this)}>
											{type}
										</button>
									);
								}
								else {
									return (
										<button className={"search_button " + type.toLowerCase()} key={type.toLowerCase()} value={type} onClick={this.updateTypeSearch.bind(this)}>
											{type}
										</button>
									);
								}
								})
							}
							<button className="search_button" onClick={this.updateTypeSearch.bind(this)}>
								Reset
							</button>
						</div>
					</div>
					{pokemon.map(p => (
						<div id="pokedex_entry" key={p.id} onClick={this.handleClick.bind(this, p.id)}>
							<div id="center_img">
								<img src={"./img/gif/" + p.id + ".gif"} />
								<p id="pokemon_name">{p.name}</p>
							</div>
						</div>
					))}
				</div>
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