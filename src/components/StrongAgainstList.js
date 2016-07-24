/* @flow */

import React, { PropTypes, Component } from 'react';
import { InteractionManager } from 'react-native';
import PokemonList from './PokemonList';
import db from '../db';

type Props = {
  onNavigate: Function;
}

export default class StrongAgainstList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
  };

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      pokemons: [],
    };
  }

  render() {
    if (!this.state.pokemons.length) {
      InteractionManager.runAfterInteractions(() => {
        let pokemons = [];
        this.props.pokemon.type.forEach(type => {
          db.objects('Pokemon').forEach(p => {
            p.type.forEach(t => {
              t.weaknesses.forEach(s => {
                if (s.name === type.name && !pokemons.includes(p)) {
                  pokemons.push(p);
                }
              });
            });
          });
        });
        this.setState({pokemons});
      });
    }

    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
