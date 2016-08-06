/* @flow */

import find from 'lodash/find';
import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PokemonList from './PokemonList';
import store from '../store';

type Props = {
  pokemon: Object;
  onNavigate: Function;
}

type State = {
  pokemons: Array<Object>;
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
    const typeDetails = find(store.getTypes(), ({ name }) => pokemon.types.includes(name));
    const { strengths, weaknesses } = typeDetails;
    const pokemons = store.getPokemons().filter(({ types }) => (
      types.some(t => strengths.includes(t)) && !types.some(t => weaknesses.includes(t))
    ));

    this.setState({ pokemons });
  };

  render() {
    return (
      <PokemonList data={this.state.pokemons} onNavigate={this.props.onNavigate} />
    );
  }
}
