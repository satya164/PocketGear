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

export default class StrongAgainstList extends Component<void, Props, State> {

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
    const typeDetails = typeChart.find(({ name }) => pokemon.types.includes(name));
    const strongAgainst = typeDetails.super_effective;
    const pokemons = store.getPokemons().filter(({ types }) =>
      types.every(t => strongAgainst.includes(t))
    )
    .sort((a, b) => (a.attack + a.defense + a.stamina) - (b.attack + b.defense + b.stamina));

    this.setState({ pokemons });
  };

  render() {
    if (this.state.pokemons.length === 0) {
      return (
        <NoResults
          source={require('../../assets/images/chansey.png')}
          label={`${this.props.pokemon.name} seems weak`}
        />
      );
    }

    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
