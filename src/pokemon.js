import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pokedex } from './pokedex.js';

export class Pokemon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			p: null,
			showPokedex: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		fetch("http://localhost:3000/pokemon/" + this.props.pokemonId)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						p: result[0]
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

	handleClick(event) {
		this.setState({
			showPokedex: true
		});
	}

	getWidthString(stat) {
		return (stat / 200 * 100).toString();
	}

	getComponent() {
		const p = this.state.p;

		// check if pokemon has a second type
		let type2;
		if (p.type2) {
			type2 = <div className={"type " + p.type2.toLowerCase()}>
				{p.type2.toUpperCase()}
			</div>;
		}
		else {
			type2 = <div></div>;
		}

		// calculate stats' percentage for bar graph
		const hp_style = {
			width: this.getWidthString(p.hp) + '%'
		};
		const atk_style = {
			width: this.getWidthString(p.atk) + '%'
		};
		const def_style = {
			width: this.getWidthString(p.def) + '%'
		};
		const satk_style = {
			width: this.getWidthString(p.satk) + '%'
		};
		const sdef_style = {
			width: this.getWidthString(p.sdef) + '%'
		};
		const spd_style = {
			width: this.getWidthString(p.spd) + '%'
		};

		return (
			<div>
				<div id="back_button" onClick={this.handleClick.bind(this)}>&#8592; Back to Pokedex</div>
				<div id="pokemon_info">
					<img id="pokemon_img" src={"./img/gif/" + p.id + ".gif"} />
					<div id="center">
						<div id="name">{p.name}</div>
						<div className={"type " + p.type1.toLowerCase()}>
							{p.type1.toUpperCase()}
						</div>
						{type2}	
					</div>

					<div id="stats">
						<div className="stat_name">HP</div>
						<div className="stats_container">
							<div className="stats_value hp" style={hp_style}>{p.hp}</div>
						</div>

						<div className="stat_padding"></div>
						<div className="stat_name">Attack</div>
						<div className="stats_container">
							<div className="stats_value atk" style={atk_style}>{p.atk}</div>
						</div>
						
						<div className="stat_padding"></div>
						<div className="stat_name">Defense</div>
						<div className="stats_container">
							<div className="stats_value def" style={def_style}>{p.def}</div>
						</div>

						<div className="stat_padding"></div>
						<div className="stat_name">Sp. Atk</div>
						<div className="stats_container">
							<div className="stats_value satk" style={satk_style}>{p.satk}</div>
						</div>

						<div className="stat_padding"></div>
						<div className="stat_name">Sp. Def</div>
						<div className="stats_container">
							<div className="stats_value sdef" style={sdef_style}>{p.sdef}</div>
						</div>
						
						<div className="stat_padding"></div>
						<div className="stat_name">Speed</div>
						<div className="stats_container">
							<div className="stats_value spd" style={spd_style}>{p.spd}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { error, isLoaded, p, showPokedex } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <object type="image/svg+xml" data="./img/pokeball.svg"></object>;
		} else {
			if (showPokedex) {
				return <Pokedex />;
			}
			else {
				return (
					this.getComponent()
				);
			}
		}
	}
}