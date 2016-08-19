/* @flow */

import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PokemonList from './PokemonList';
import NoResults from './NoResults';
import store from '../store';
import type {
  Pokemon,
} from '../typeDefinitions';

type Props = {
  pokemon: Pokemon;
  onNavigate: Function;
}

type State = {
  pokemons: Array<Pokemon>;
}

export default class WeakAgainstList extends Component<void, Props, State> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
  };

  state: State = {
    pokemons: [],
  };

  componentWillMount() {
    this._updateData();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return shallowCompare(this, nextProps, nextState);
  }

  _updateData = () => {
    const { pokemon } = this.props;
    const typeChart = store.getTypeChart();
    const weakAgainst = typeChart.filter(t =>
      pokemon.types.some(type => t.super_effective.includes(type)) &&
      !pokemon.types.some(type => t.not_very_effective.includes(type))
    ).map(t => t.name);
    const pokemons = store.getPokemons().filter(({ types }) =>
      types.every(t => weakAgainst.includes(t))
    )
    .sort((a, b) => (b.attack + b.defense + b.stamina) - (a.attack + a.defense + a.stamina));

    this.setState({ pokemons });
  };

  render() {
    if (this.state.pokemons.length === 0) {
      return (
        <NoResults
          source={require('../../assets/images/ultra-ball.png')}
          label={`${this.props.pokemon.name} seems unbeatable`}
        />
      );
    }

    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
