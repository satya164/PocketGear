/* @flow */

import React, { PropTypes, Component } from 'react';
import { InteractionManager } from 'react-native';
import PokemonList from './PokemonList';
import db from '../db';

type Props = {
  pokemon: Object;
  onNavigate: Function;
}

type State = {
  pokemons: Array<Object>;
}

export default class WeakAgainstList extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
  };

  state: State = {
    pokemons: [],
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this._updateData);
  }

  _updateData = () => {
    const pokemons = [];
    this.props.pokemon.type.forEach(type => {
      db.objects('Pokemon').forEach(p => {
        p.type.forEach(t => {
          t.strengths.forEach(s => {
            if (s.name === type.name && !pokemons.includes(p)) {
              pokemons.push(p);
            }
          });
        });
      });
    });
    this.setState({ pokemons });
  };

  render() {
    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
