/* @flow */

import React, { PropTypes, Component } from 'react';
import { InteractionManager } from 'react-native';
import PokemonList from './PokemonList';
import db from '../db';

type Props = {
  onNavigate: Function;
}

export default class WeakAgainstList extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
  };

  state = {
    pokemons: [],
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let pokemons = [];
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
      this.setState({pokemons});
    });
  }

  render() {
    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
